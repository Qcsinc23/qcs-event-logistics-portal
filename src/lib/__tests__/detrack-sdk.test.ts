/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { callDetrackCreateJobAPI, type DetrackJobPayload, type DetrackJobCreationResponse } from '../detrack-sdk';
import { executeWithResilience } from '@/lib/resilience/failure-handler';
import * as Sentry from '@sentry/nextjs';

// --- Mocks ---
vi.mock('@/lib/resilience/failure-handler', () => ({
  // Mock executeWithResilience to call the operation directly by default for most tests
  // Specific tests can override this mock for resilience testing if needed.
  executeWithResilience: vi.fn(async ({ operation }) => operation()),
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

// Mock global fetch
global.fetch = vi.fn();

describe('callDetrackCreateJobAPI', () => {
  let mockExecuteWithResilience: Mock;
  let mockFetch: Mock;

  const samplePayload: DetrackJobPayload = {
    type: 'Delivery', // Added required type field
    do_number: 'DO12345',
    address: '1 Test Address',
    date: '2024-01-01', // Example, ensure payload matches what your SDK expects
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockExecuteWithResilience = executeWithResilience as Mock;
    mockFetch = global.fetch as Mock;

    // Default pass-through for executeWithResilience for most tests
    mockExecuteWithResilience.mockImplementation(async ({ operation } : { operation: () => Promise<any>}) => {
      return operation();
    });
  });

  it('should successfully call the proxy and return Detrack job ID on success', async () => {
    const mockProxyResponse: DetrackJobCreationResponse = { 
      success: true, 
      detrackJobId: 'DETRACK_JOB_789',
      rawResponse: { info: 'Job created' }
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProxyResponse,
    } as Response);

    const result = await callDetrackCreateJobAPI(samplePayload);

    expect(result.success).toBe(true);
    expect(result.detrackJobId).toBe('DETRACK_JOB_789');
    expect(result.error).toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('/api/detrack/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(samplePayload),
    });
    expect(mockExecuteWithResilience).toHaveBeenCalledWith(expect.objectContaining({
      featureKey: 'DETRACK_SDK_CREATE_JOB',
    }));
  });

  it('should return error if proxy call is not ok', async () => {
    const mockErrorResponse = { error: 'Proxy error', detail: 'Something went wrong at proxy' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => mockErrorResponse,
    } as Response);

    // executeWithResilience will catch the error thrown by the operation and then call the fallback.
    // We need to mock executeWithResilience to simulate its fallback behavior for this test.
    mockExecuteWithResilience.mockImplementationOnce(async ({ fallback } : { fallback?: (e:Error) => Promise<any>}) => {
        if (fallback) return fallback(new Error(mockErrorResponse.error || `Detrack job creation via proxy failed with status 500`));
        return { success: false, error: mockErrorResponse.error || `Detrack job creation via proxy failed with status 500` };
    });
    
    const result = await callDetrackCreateJobAPI(samplePayload);

    expect(result.success).toBe(false);
    expect(result.error).toContain('Detrack job creation via proxy failed with status 500');
    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      'Detrack SDK: Proxy call to create job failed',
      expect.anything() // Sentry is called inside the operation before error is thrown
    );
  });
  
  it('should return error if proxy returns success:false', async () => {
    const mockProxyResponse = { 
      success: false, 
      error: 'Detrack rejected the request',
      rawResponse: { errors: [{ code: '101', message: 'Invalid API key (mocked)'}] }
    };
    mockFetch.mockResolvedValueOnce({
      ok: true, // Proxy call itself is ok
      json: async () => mockProxyResponse,
    } as Response);

    const result = await callDetrackCreateJobAPI(samplePayload);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Detrack rejected the request');
    expect(result.rawResponse).toEqual(mockProxyResponse.rawResponse);
  });


  it('should handle network errors during fetch and trigger fallback', async () => {
    const networkError = new Error('Network connection failed');
    mockFetch.mockRejectedValueOnce(networkError);

    // Mock executeWithResilience to simulate its fallback behavior
    mockExecuteWithResilience.mockImplementationOnce(async ({ fallback } : { fallback?: (e:Error) => Promise<any>}) => {
        if (fallback) return fallback(networkError);
        return { success: false, error: networkError.message };
    });

    const result = await callDetrackCreateJobAPI(samplePayload);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network connection failed');
    expect(Sentry.captureException).toHaveBeenCalledWith(networkError, expect.anything()); // Sentry called by fallback
  });
  
  // More tests could be added for the resilience aspect itself,
  // e.g., by making executeWithResilience mock more sophisticated to simulate multiple failures.
});
