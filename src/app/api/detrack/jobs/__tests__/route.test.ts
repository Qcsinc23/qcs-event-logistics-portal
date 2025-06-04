/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { POST } from '../route'; // Adjust path to your route handler
import { auth } from '@clerk/nextjs/server';
import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';

// --- Mocks ---
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

// Mock global fetch
global.fetch = vi.fn();

describe('POST /api/detrack/jobs', () => {
  const mockUserId = 'user_authorized_123';
  const mockDetrackApiKey = 'test-detrack-api-key';
  const mockDetrackBaseUrl = 'https://mock.detrack.com/api/v2';

  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    vi.clearAllMocks();
    originalEnv = { ...process.env }; // Backup original env
    process.env.DETRACK_API_KEY = mockDetrackApiKey;
    process.env.DETRACK_BASE_URL = mockDetrackBaseUrl;

    // Default auth mock
    vi.mocked(auth).mockReturnValue({ userId: mockUserId } as any); // Cast as any for simplicity
    vi.mocked(fetch).mockClear();
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original env
  });

  const createMockRequest = (body: any, headers?: Record<string, string>): NextRequest => {
    const req = new NextRequest('http://localhost/api/detrack/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
    return req;
  };

  it('should return 401 if user is not authenticated', async () => {
    vi.mocked(auth).mockReturnValue({ userId: null } as any);
    const mockJobPayload = { data: 'some job data' };
    const request = createMockRequest(mockJobPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(401);
    expect(json.error).toBe('Unauthorized');
  });

  it('should return 500 if Detrack API key is not configured', async () => {
    delete process.env.DETRACK_API_KEY; // Simulate missing API key
    const mockJobPayload = { data: 'some job data' };
    const request = createMockRequest(mockJobPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe('Detrack API key not configured on server.');
    expect(Sentry.captureMessage).toHaveBeenCalledWith('Detrack API key is not configured.', 'error');
  });

  it('should return 400 if request payload is invalid JSON', async () => {
    const request = new NextRequest('http://localhost/api/detrack/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json', // Not a valid JSON string
    });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe('Invalid JSON payload');
    expect(Sentry.captureException).toHaveBeenCalled();
  });

  it('should successfully proxy request to Detrack API and return Detrack response', async () => {
    const mockJobPayload = { job_type: 'delivery', address: '123 Main St' };
    const mockDetrackResponse = { success: true, job_id: 'detrack_job_123' };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockDetrackResponse,
    } as Response);

    const request = createMockRequest(mockJobPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual(mockDetrackResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${mockDetrackBaseUrl}/dn/jobs`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': mockDetrackApiKey,
        },
        body: JSON.stringify(mockJobPayload),
      })
    );
  });

  it('should return Detrack API error if Detrack request fails', async () => {
    const mockJobPayload = { job_type: 'delivery', address: '123 Main St' };
    const mockDetrackErrorResponse = { error: 'Invalid D.O. number', code: 422 };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => mockDetrackErrorResponse,
    } as Response);

    const request = createMockRequest(mockJobPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(422);
    expect(json.error).toBe('Detrack API request failed');
    expect(json.details).toEqual(mockDetrackErrorResponse);
    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      `Detrack API request failed with status 422`,
      expect.anything()
    );
  });

  it('should handle network errors when calling Detrack API', async () => {
    const mockJobPayload = { job_type: 'delivery', address: '123 Main St' };
    const networkError = new Error('Network connection failed');
    vi.mocked(fetch).mockRejectedValueOnce(networkError);

    const request = createMockRequest(mockJobPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe('Failed to call Detrack API');
    expect(Sentry.captureException).toHaveBeenCalledWith(networkError, expect.anything());
  });

  // TODO: Add tests for Zod validation of jobPayload once implemented.
});
