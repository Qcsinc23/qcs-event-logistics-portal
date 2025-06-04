import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import * as Sentry from '@sentry/nextjs';

const DETRACK_API_KEY = process.env.DETRACK_API_KEY;
const DETRACK_BASE_URL = process.env.DETRACK_BASE_URL || 'https://app.detrack.com/api/v2'; // Default if not in env

export async function POST(request: NextRequest) {
  const { userId } = await auth(); // Using await as per TS errors in this environment

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!DETRACK_API_KEY) {
    console.error('Detrack API key is not configured.');
    Sentry.captureMessage('Detrack API key is not configured.', 'error');
    return NextResponse.json({ error: 'Detrack API key not configured on server.' }, { status: 500 });
  }

  let jobPayload;
  try {
    jobPayload = await request.json();
  } catch (error) {
    Sentry.captureException(error, { extra: { message: 'Invalid JSON payload for Detrack job creation' } });
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  // TODO: Add Zod validation for the jobPayload if a strict schema is known for Detrack.
  // For now, we'll pass it through.

  const detrackApiUrl = `${DETRACK_BASE_URL}/dn/jobs`; // As per TASK.MD, confirm this endpoint

  try {
    const response = await fetch(detrackApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': DETRACK_API_KEY,
      },
      body: JSON.stringify(jobPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Detrack API Error:', response.status, responseData);
      Sentry.captureMessage(`Detrack API request failed with status ${response.status}`, {
        level: 'error',
        extra: { 
          detrackUrl: detrackApiUrl, 
          requestPayload: jobPayload, 
          responseStatus: response.status, 
          responseData 
        },
      });
      return NextResponse.json({ error: 'Detrack API request failed', details: responseData }, { status: response.status });
    }

    return NextResponse.json(responseData, { status: response.status });

  } catch (error) {
    console.error('Error calling Detrack API:', error);
    Sentry.captureException(error, { 
      extra: { 
        message: 'Exception during Detrack API call',
        detrackUrl: detrackApiUrl, 
        requestPayload: jobPayload 
      } 
    });
    return NextResponse.json({ error: 'Failed to call Detrack API' }, { status: 500 });
  }
}
