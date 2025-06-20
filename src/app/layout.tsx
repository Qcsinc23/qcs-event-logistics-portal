import type { Metadata } from "next";
import { Inter } from 'next/font/google'; // Import Inter font
import {
  ClerkProvider,
  // SignInButton, // These will be part of the landing page Header component
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs';
// import Link from 'next/link'; // Not directly used in this root layout structure anymore
import "./globals.css";

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Optional: if you want to use it as a CSS variable
});

export const metadata: Metadata = {
  title: "Quiet Craft Solutions Inc. — Veteran-Owned Event Logistics",
  description: "Secure, on-time courier & logistics services for corporate events across NJ, NY & CT. SDVOSB certified.",
  metadataBase: new URL("https://quietcrafting.com"),
  openGraph: {
    type: "website",
    title: "Quiet Craft Solutions Inc.",
    description: "Veteran-owned event logistics you can trust.",
    images: [{
      url: "https://quietcrafting.com/og-cover.jpg",
    }],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}> {/* Apply Inter font className to html tag */}
        <head>
          {/* Font links are removed as next/font handles Inter, and react-icons will be used for icons */}
          <script type="application/ld+json">
            {`
              {
                "@context":"https://schema.org",
                "@type":"LocalBusiness",
                "name":"Quiet Craft Solutions Inc.",
                "address":{
                  "@type":"PostalAddress",
                  "streetAddress":"165 Passaic Ave #203",
                  "addressLocality":"Fairfield",
                  "addressRegion":"NJ",
                  "postalCode":"07004"
                },
                "telephone":"+1-973-415-9532"
              }
            `}
          </script>
        </head>
        <body className="antialiased"> {/* Removed Geist font variables and other classes, base styles in globals.css */}
          <ClerkProvider>
            {/* The generic header and footer are removed from here.
                They will be part of specific page layouts or the landing page itself.
                This RootLayout now primarily sets up global providers and base HTML structure.
            */}
            {children}
          </ClerkProvider>
        </body>
      </html>
  );
}
