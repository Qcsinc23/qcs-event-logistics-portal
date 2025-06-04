import * as Sentry from '@sentry/nextjs';

const MAX_CONSECUTIVE_FAILURES = 3;

interface FailureRecord {
  count: number;
  lastFailureTimestamp: number;
}

// In-memory store for failure tracking.
// For a distributed environment, a shared store like Redis might be needed.
const failureStore = new Map<string, FailureRecord>();

const COOLDOWN_PERIOD_MS = 5 * 60 * 1000; // 5 minutes cooldown

/**
 * Tracks a failure for a given feature key.
 * @param featureKey A unique key identifying the feature or operation.
 */
function recordFailure(featureKey: string): number {
  const now = Date.now();
  let record = failureStore.get(featureKey);

  if (record && (now - record.lastFailureTimestamp) > COOLDOWN_PERIOD_MS) {
    // If cooldown period has passed since last failure, reset count
    console.log(`Resilience: Cooldown period passed for ${featureKey}. Resetting failure count.`);
    record.count = 0;
  }
  
  if (!record || record.count === 0) {
    record = { count: 1, lastFailureTimestamp: now };
  } else {
    record.count++;
    record.lastFailureTimestamp = now;
  }
  failureStore.set(featureKey, record);
  console.log(`Resilience: Failure recorded for ${featureKey}. Count: ${record.count}`);
  return record.count;
}

/**
 * Resets the failure count for a given feature key upon success.
 * @param featureKey A unique key identifying the feature or operation.
 */
function recordSuccess(featureKey: string): void {
  if (failureStore.has(featureKey)) {
    console.log(`Resilience: Success recorded for ${featureKey}. Resetting failure count.`);
    failureStore.delete(featureKey); // Or set count to 0 if preferred
  }
}

/**
 * Checks if a feature is currently in a fallback state due to repeated failures.
 * @param featureKey A unique key identifying the feature or operation.
 * @returns True if the feature should fallback, false otherwise.
 */
function shouldFallback(featureKey: string): boolean {
  const record = failureStore.get(featureKey);
  if (record && record.count >= MAX_CONSECUTIVE_FAILURES) {
    // Check if still within cooldown; if not, allow retry by not falling back
    if ((Date.now() - record.lastFailureTimestamp) <= COOLDOWN_PERIOD_MS) {
        console.warn(`Resilience: Feature ${featureKey} has reached max failures (${record.count}). Triggering fallback.`);
        return true;
    }
    console.log(`Resilience: Cooldown period passed for ${featureKey} after max failures. Allowing retry.`);
    failureStore.delete(featureKey); // Reset after cooldown even if max failures were hit
    return false;
  }
  return false;
}

interface ResilienceOptions<T> {
  featureKey: string;
  operation: () => Promise<T>;
  fallback?: (error: Error) => Promise<T>; // Optional fallback function
  // TODO: Add options for retry attempts, delays, etc. if needed later
}

/**
 * Executes an operation with resilience, tracking failures and potentially triggering a fallback.
 * @param options - The resilience options including the feature key, operation, and optional fallback.
 * @returns The result of the operation or the fallback.
 */
export async function executeWithResilience<T>(
  options: ResilienceOptions<T>
): Promise<T> {
  const { featureKey, operation, fallback } = options;

  if (shouldFallback(featureKey)) {
    const fallbackError = new Error(
      `Operation for ${featureKey} is in fallback mode due to repeated failures.`
    );
    Sentry.captureMessage(`Fallback triggered for ${featureKey}`, {
      level: 'warning',
      extra: { featureKey },
    });
    if (fallback) {
      console.warn(`Resilience: Executing fallback for ${featureKey}.`);
      return fallback(fallbackError);
    }
    // If no fallback provided, re-throw the error indicating fallback mode.
    throw fallbackError;
  }

  try {
    const result = await operation();
    recordSuccess(featureKey);
    return result;
  } catch (error) {
    console.error(`Resilience: Operation failed for ${featureKey}. Error:`, error);
    const failureCount = recordFailure(featureKey);
    Sentry.captureException(error, {
      extra: { 
        featureKey, 
        failureCount,
        message: `Operation failed for ${featureKey}` 
      },
      level: 'error',
    });

    // If this failure causes a fallback state, and a fallback function exists, execute it.
    if (failureCount >= MAX_CONSECUTIVE_FAILURES && fallback) {
      if (shouldFallback(featureKey)) { // Re-check to ensure it's still in fallback state (e.g. cooldown not passed during this execution)
        console.warn(`Resilience: Max failures reached for ${featureKey}. Executing fallback immediately.`);
        return fallback(error instanceof Error ? error : new Error(String(error)));
      }
    }
    // Otherwise, or if no fallback, re-throw the original error.
    throw error;
  }
}

// Example usage (conceptual):
// async function someApiCall(): Promise<string> {
//   // ... actual API call
//   // throw new Error("API failed!"); // Simulate failure
//   return "API success";
// }
//
// async function myFeature() {
//   try {
//     const result = await executeWithResilience({
//       featureKey: 'MY_API_CALL',
//       operation: someApiCall,
//       fallback: async (err) => {
//         console.error("Fallback due to:", err.message);
//         return "Fallback data";
//       }
//     });
//     console.log("Result:", result);
//   } catch (e) {
//     console.error("Final error after resilience attempts:", e.message);
//   }
// }
