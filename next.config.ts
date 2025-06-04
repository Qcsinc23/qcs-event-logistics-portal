import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing Next.js config options here (if any)
  // For example:
  // reactStrictMode: true,
  // swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  org: process.env.SENTRY_ORG, // Ensure SENTRY_ORG is in your .env file
  project: process.env.SENTRY_PROJECT, // Ensure SENTRY_PROJECT is in your .env file

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN, // Ensure SENTRY_AUTH_TOKEN is in your .env file

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
};

// Make sure to source maps to Sentry in Vercel builds:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/production-builds/
// In Vercel, set the SENTRY_AUTH_TOKEN environment variable.
// This will allow Sentry to fetch source maps from Vercel.

// Enable source map generation in Vercel by ensuring the
// `GENERATE_SOURCEMAP` environment variable is set to `true` in your Vercel project settings.
// See: https://vercel.com/docs/build-output-api/v3#features/generating-source-maps

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
