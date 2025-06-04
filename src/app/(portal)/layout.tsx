import React from 'react';
import { UserButton, SignedIn } from '@clerk/nextjs';
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
    <div className="flex flex-col min-h-screen">
      {/* Portal-specific header or navigation can go here if different from RootLayout */}
      {/* Example: A sub-header for portal sections */}
      <header className="bg-slate-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/dashboard" className="text-lg font-semibold hover:text-slate-200">
            Client Portal
          </a>
          <nav className="space-x-4">
            <a href="/dashboard" className="hover:text-slate-300">Dashboard</a>
            <a href="/(portal)/orders/create" className="hover:text-slate-300">Create Order</a>
            {/* Add more portal navigation links here */}
            {/* e.g., <a href="/(portal)/orders" className="hover:text-slate-300">View Orders</a> */}
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
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
      
      {/* Portal-specific footer can go here if different, or rely on RootLayout's footer */}
      {/* For simplicity, we assume RootLayout's footer is sufficient */}
    </div>
  );
}
