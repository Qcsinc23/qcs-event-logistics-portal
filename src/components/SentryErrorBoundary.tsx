"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  eventId: string | null;
}

class SentryErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, eventId: null };
  }

  static getDerivedStateFromError(_error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, eventId: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const eventId = Sentry.captureException(error, { 
      extra: { 
        componentStack: errorInfo.componentStack 
      } 
    });
    this.setState({ eventId });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Something went wrong.</h1>
          <p>We've been notified and are looking into it.</p>
          {this.state.eventId && (
            <p>Error ID: {this.state.eventId}</p>
          )}
          <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId || undefined })}>
            Report feedback
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;
