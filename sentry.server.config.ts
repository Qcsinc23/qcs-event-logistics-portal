// This file configures the Sentry DSN for server-side error reporting.
// It is used by Next.js server-side code and API routes.

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for finer control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // You can uncomment the following line to turn off server-side
  // automatic instrumentation (which is on by default)
  // autoInstrumentServerFunctions: false,
});
