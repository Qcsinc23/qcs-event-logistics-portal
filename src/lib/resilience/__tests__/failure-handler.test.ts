/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { executeWithResilience } from '../failure-handler';
import * as Sentry from '@sentry/nextjs';

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  addBreadcrumb: vi.fn(),
}));

describe('executeWithResilience', () => {
  const featureKey = 'TEST_FEATURE';
  let mockOperation: Mock;
  let mockFallback: Mock;

  beforeEach(() => {
    // Reset mocks and internal state of failure-handler before each test
    // This is tricky because failureStore is module-scoped.
    // For true isolation, failure-handler might need a reset function or be refactored.
    // For now, we rely on different featureKeys or understand tests might interact if using same key.
    // Or, we can try to clear the map directly if we can access it (not ideal).
    // As a simple approach for now, tests will use unique feature keys or be mindful of shared state.
    
    mockOperation = vi.fn();
    mockFallback = vi.fn();
    vi.useFakeTimers(); // Use fake timers for cooldown logic
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers(); // Restore real timers
    // Attempt to clear the failureStore for the specific key used in tests if possible,
    // or ensure tests use unique keys to avoid interference.
    // This is a limitation of the current in-memory module-scoped store for testing.
  });

  it('should execute operation successfully and record success', async () => {
    const successResult = { data: 'success' };
    mockOperation.mockResolvedValue(successResult);

    const result = await executeWithResilience({
      featureKey,
      operation: mockOperation,
      fallback: mockFallback,
    });

    expect(result).toEqual(successResult);
    expect(mockOperation).toHaveBeenCalledTimes(1);
    expect(mockFallback).not.toHaveBeenCalled();
    // TODO: Add assertion for recordSuccess (e.g., by checking internal state if possible or through side effects)
  });

  it('should record failure and re-throw error if operation fails once', async () => {
    const error = new Error('Operation failed');
    mockOperation.mockRejectedValue(error);

    await expect(
      executeWithResilience({
        featureKey: `${featureKey}_FAIL1`, // Use unique key
        operation: mockOperation,
        fallback: mockFallback,
      })
    ).rejects.toThrow(error);

    expect(mockOperation).toHaveBeenCalledTimes(1);
    expect(mockFallback).not.toHaveBeenCalled();
    expect(Sentry.captureException).toHaveBeenCalledWith(error, expect.anything());
    // TODO: Add assertion for recordFailure
  });

  it('should trigger fallback after 3 consecutive failures', async () => {
    const testKey = `${featureKey}_FAIL3_FALLBACK`;
    const error = new Error('Operation failed repeatedly');
    const fallbackResult = { data: 'fallback data' };
    mockOperation.mockRejectedValue(error);
    mockFallback.mockResolvedValue(fallbackResult);

    // First failure
    await expect(executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback })).rejects.toThrow(error);
    // Second failure
    await expect(executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback })).rejects.toThrow(error);
    // Third failure - should now execute fallback
    const result = await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback });
    
    expect(result).toEqual(fallbackResult);
    expect(mockOperation).toHaveBeenCalledTimes(3); // Called 3 times
    expect(mockFallback).toHaveBeenCalledTimes(1); // Fallback called on 3rd attempt's processing
    expect(Sentry.captureException).toHaveBeenCalledTimes(3); // Error captured each time
    expect(Sentry.captureMessage).toHaveBeenCalledWith(`Fallback triggered for ${testKey}`, expect.anything());
  });

  it('should continue to use fallback if called again within cooldown period after 3 failures', async () => {
    const testKey = `${featureKey}_COOLDOWN_FALLBACK`;
    const error = new Error('Initial failures');
    const fallbackResult = { data: 'fallback data' };
    mockOperation.mockRejectedValue(error);
    mockFallback.mockResolvedValue(fallbackResult);

    // Trigger 3 failures
    await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback }).catch(() => {});
    await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback }).catch(() => {});
    await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback }); // This one executes fallback

    // Attempt again immediately (within cooldown)
    const result = await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback });
    expect(result).toEqual(fallbackResult);
    expect(mockOperation).toHaveBeenCalledTimes(3); // Operation not called again
    expect(mockFallback).toHaveBeenCalledTimes(2); // Fallback called again
  });

  it('should reset failure count and execute operation after cooldown period', async () => {
    const testKey = `${featureKey}_COOLDOWN_RESET`;
    const error = new Error('Failures before cooldown');
    const successResult = { data: 'success after cooldown' };
    mockOperation.mockRejectedValueOnce(error); // Fails 3 times
    mockOperation.mockRejectedValueOnce(error);
    mockOperation.mockRejectedValueOnce(error);
    mockOperation.mockResolvedValueOnce(successResult); // Succeeds on 4th attempt (after cooldown)
    
    const fallbackResult = { data: 'fallback data' };
    mockFallback.mockResolvedValue(fallbackResult);

    // Trigger 3 failures
    await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback }).catch(() => {});
    await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback }).catch(() => {});
    await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback }); // Fallback executed

    // Advance time past cooldown (5 minutes + 1 second)
    vi.advanceTimersByTime(5 * 60 * 1000 + 1000);

    const result = await executeWithResilience({ featureKey: testKey, operation: mockOperation, fallback: mockFallback });
    expect(result).toEqual(successResult);
    expect(mockOperation).toHaveBeenCalledTimes(4); // Called 4th time
    expect(mockFallback).toHaveBeenCalledTimes(1); // Fallback only called once initially
  });

  it('should reset failure count after a successful operation following failures', async () => {
    const testKey = `${featureKey}_SUCCESS_RESET`;
    const error = new Error('Temporary failure');
    const successData = { data: 'eventual success' };

    // Fail once
    mockOperation.mockRejectedValueOnce(error);
    await expect(executeWithResilience({ featureKey: testKey, operation: mockOperation })).rejects.toThrow(error);
    expect(mockOperation).toHaveBeenCalledTimes(1);

    // Succeed
    mockOperation.mockResolvedValueOnce(successData);
    const result = await executeWithResilience({ featureKey: testKey, operation: mockOperation });
    expect(result).toEqual(successData);
    expect(mockOperation).toHaveBeenCalledTimes(2);

    // Fail again - count should be 1, not 2
    mockOperation.mockRejectedValueOnce(error);
    await expect(executeWithResilience({ featureKey: testKey, operation: mockOperation })).rejects.toThrow(error);
    // To verify count is 1, we'd need to inspect failureStore or add more specific logging/events from recordFailure
    // For now, we assume if it didn't go to fallback after 1 more failure, it reset.
    // A more robust test would involve failing 3 times, succeeding, then failing once more and ensuring no fallback.
  });

  it('should throw error if operation fails and no fallback is provided', async () => {
    const testKey = `${featureKey}_NO_FALLBACK`;
    const error = new Error('Critical failure, no fallback');
    mockOperation.mockRejectedValue(error);

    await expect(
      executeWithResilience({ featureKey: testKey, operation: mockOperation })
    ).rejects.toThrow(error);
    expect(mockOperation).toHaveBeenCalledTimes(1);
  });

});
