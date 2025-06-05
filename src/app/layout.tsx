import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import Link from 'next/link'; // Added Link import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QCS Event Logistics Portal",
  description: "Quiet Craft Solutions Inc. Client Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          {/* Google Fonts: Roboto & Montserrat (currently used by globals.css old :root) & Inter (new standard) */}
          {/* The Inter font is already imported in globals.css, so this specific link for Inter might be redundant but harmless. */}
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Montserrat:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
          {/* Material Symbols */}
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
          // Note: The new globals.css sets font-family to var(--font-body) which is Roboto.
          // The geistSans and geistMono variables are still available if needed for specific sections.
        >
          <ClerkProvider>
          <header className="bg-gray-800 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold hover:text-gray-300">
                QCS Logistics
              </Link>
              <div className="space-x-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white transition-colors">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white transition-colors">Sign Up</button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                  <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                  {/* Add other portal links here if needed */}
                </SignedIn>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Quiet Craft Solutions Inc. All rights reserved.
          </footer>
          </ClerkProvider>
        </body>
      </html>
  );
}
