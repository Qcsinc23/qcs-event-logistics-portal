import React from 'react';
import Head from 'next/head'; // Next.js App Router uses Metadata API for <head> in layouts/pages
import Header from './Header';
import Footer from './Footer';

interface LandingLayoutProps {
  children: React.ReactNode;
  pageTitle?: string; // Optional page title to append to site title
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children, pageTitle }) => {
  // Site title can be managed globally via root layout's metadata,
  // or overridden per page using generateMetadata in page.tsx files.
  // For simplicity here, we're not directly setting <title> as it's better handled by Next.js App Router metadata.
  // The Head component from 'next/head' is more for Pages Router or specific client-side head manipulations.
  // However, if specific meta tags are needed ONLY for this layout and its children, they could be added.

  // The companyName prop will be passed down from the main page.tsx
  const companyName = "Quiet Craft Solutions Inc.";

  return (
    <>
      {/* 
        In App Router, <Head> from 'next/head' is not used in layouts/pages for title/meta.
        Instead, export a 'metadata' object or 'generateMetadata' function from page.tsx or layout.tsx.
        If this LandingLayout were a top-level layout.tsx for a route group, it could export metadata.
        Since it's a component, page-specific metadata should be in the actual page.tsx that uses this layout.
      */}
      <Header companyName={companyName} />
      <main>{children}</main>
      <Footer companyName={companyName} />
    </>
  );
};

export default LandingLayout;
