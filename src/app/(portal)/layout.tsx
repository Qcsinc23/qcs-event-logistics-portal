import React from 'react';
import { UserButton, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import PortalNavLink from './PortalNavLink';
import SentryErrorBoundary from '@/components/SentryErrorBoundary'; // Import the Sentry Error Boundary
// import { auth } from '@clerk/nextjs/server'; // Not typically needed directly in layout for protection if middleware is active

// You might want a sidebar or a different header for the portal section.
// For now, this will be a simple layout wrapper.

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { userId } = auth(); // Middleware should handle protection.
  // if (!userId) {
  //   // This should ideally not be reached if middleware is correctly configured
  //   // and redirecting unauthenticated users from portal routes.
  //   // redirect('/sign-in'); 
  //   return null; // Or a loading spinner/message
  // }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-light-gray dark:bg-dark-background">
      <header className="bg-slate-700 dark:bg-dark-surface text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="text-lg font-semibold hover:text-slate-200 dark:hover:text-slate-300">
            Client Portal
          </Link>
          <nav className="space-x-4" aria-label="Main portal navigation">
            <PortalNavLink href="/dashboard">Dashboard</PortalNavLink>
            <PortalNavLink href="/(portal)/end-customers">End Customers</PortalNavLink>
            <PortalNavLink href="/(portal)/orders/create">Create Order</PortalNavLink>
            {/* Add more portal navigation links here */}
            {/* e.g., <PortalNavLink href="/(portal)/orders">View Orders</PortalNavLink> */}
          </nav>
          <div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            {/* SignedOut should not be visible here if routes are protected by middleware */}
          </div>
        </div>
      </header>

      {/* Main content area for portal pages */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 text-text-dark-gray dark:text-dark-text-primary">
        <SentryErrorBoundary>
          {children}
        </SentryErrorBoundary>
      </main>
      
      {/* Portal-specific footer can go here if different, or rely on RootLayout's footer */}
      {/* For simplicity, we assume RootLayout's footer is sufficient */}
    </div>
  );
}
