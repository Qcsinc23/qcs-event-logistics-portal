import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
// import crypto from 'crypto'; // For webhook signature verification if needed

const DETRACK_WEBHOOK_SECRET = process.env.DETRACK_WEBHOOK_SECRET;

// Function to verify Detrack webhook signature (placeholder)
// Detrack's documentation should specify how their webhooks are signed.
// This is a generic example; you'll need to adapt it.
// async function verifySignature(request: NextRequest, body: string): Promise<boolean> {
//   if (!DETRACK_WEBHOOK_SECRET) {
//     console.error('Detrack webhook secret is not configured.');
//     Sentry.captureMessage('Detrack webhook secret is not configured.', 'error');
//     return false;
//   }
//   const signatureHeader = request.headers.get('X-Detrack-Signature'); // Example header
//   if (!signatureHeader) {
//     console.warn('No signature header found for Detrack webhook.');
//     return false; // Or handle as an error depending on requirements
//   }
//
//   // Example using HMAC SHA256 - replace with Detrack's actual method
//   const expectedSignature = crypto
//     .createHmac('sha256', DETRACK_WEBHOOK_SECRET)
//     .update(body)
//     .digest('hex');
//
//   return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expectedSignature));
// }

export async function POST(request: NextRequest) {
  console.log('Detrack webhook received.');

  let payload: any;
  let rawBody: string;

  try {
    rawBody = await request.text();
    payload = JSON.parse(rawBody);
  } catch (error) {
    console.error('Error parsing Detrack webhook payload:', error);
    Sentry.captureException(error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // TODO: Implement and enable signature verification based on Detrack's documentation
  // const isValid = await verifySignature(request, rawBody);
  // if (!isValid) {
  //   console.warn('Invalid Detrack webhook signature.');
  //   Sentry.captureMessage('Invalid Detrack webhook signature.', 'warning');
  //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  // }

  console.log('Detrack webhook payload:', JSON.stringify(payload, null, 2));

  // TODO: Implement processing logic based on the event type and payload
  // Example:
  // const eventType = payload.event_type; // Or however Detrack structures it
  // switch (eventType) {
  //   case 'job_status_updated':
  //     // Update order status in Prisma DB
  //     break;
  //   case 'pod_received':
  //     // Store POD information
  //     break;
  //   default:
  //     console.log(`Unhandled Detrack event type: ${eventType}`);
  // }

  // For now, just log and acknowledge
  Sentry.captureMessage(`Detrack webhook received: ${payload?.event_type || 'Unknown event'}`, {
    level: 'info',
    extra: { payload },
  });

  return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
}
