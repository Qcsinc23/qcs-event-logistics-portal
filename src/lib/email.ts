import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;

if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not set. Email sending will be disabled.");
}
if (!fromEmail) {
  console.warn("FROM_EMAIL is not set. Email sending will be disabled.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string; // HTML content for the email
  text?: string; // Optional plain text version
  // cc?: string | string[];
  // bcc?: string | string[];
  // reply_to?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!resend || !fromEmail) {
    const errorMessage = "Resend is not configured. Missing API key or From email.";
    console.error(errorMessage);
    Sentry.captureMessage(errorMessage, "warning");
    return { success: false, error: errorMessage };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>?/gm, ''), // Generate text from HTML if not provided
      // cc: options.cc,
      // bcc: options.bcc,
      // reply_to: options.reply_to,
    });

    if (error) {
      console.error('Error sending email via Resend:', error);
      Sentry.captureException(error, { extra: { emailOptions: { to: options.to, subject: options.subject } } });
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully. Message ID:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('Failed to send email:', err);
    Sentry.captureException(err, { extra: { emailOptions: { to: options.to, subject: options.subject } } });
    const errorMessage = err instanceof Error ? err.message : "Unknown error sending email";
    return { success: false, error: errorMessage };
  }
}

// Example basic email templates (conceptual, to be expanded)

/**
 * Generates HTML for a generic notification email.
 */
export function getGenericNotificationHtml(title: string, message: string): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h1 style="font-size: 24px; color: #333;">${title}</h1>
          <p style="font-size: 16px; color: #555;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated message from QCS Logistics Portal.</p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates HTML for an order confirmation email.
 * (This is a placeholder and would need actual order details)
 */
export function getOrderConfirmationHtml(orderNumber: string, customerName: string): string {
  const message = `Dear ${customerName},<br /><br />Your order #${orderNumber} has been successfully placed. We will notify you with further updates.<br /><br />Thank you for choosing QCS Logistics!`;
  return getGenericNotificationHtml("Order Confirmation", message);
}

/**
 * Generates HTML for a critical failure alert email (e.g., for admins).
 */
export function getCriticalFailureAlertHtml(featureName: string, errorDetails: string): string {
  const message = `A critical failure occurred in the QCS Logistics Portal.<br /><br />
                   <strong>Feature:</strong> ${featureName}<br />
                   <strong>Error Details:</strong><br />
                   <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 3px;">${errorDetails}</pre><br />
                   Please investigate immediately.`;
  return getGenericNotificationHtml("Critical System Alert", message);
}
