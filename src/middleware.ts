import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that should not be protected by authentication
const isPublicRoute = createRouteMatcher([
  '/', // Example: Homepage
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/(.*)', // Assuming webhooks are public but should be secured by other means (e.g. signature verification)
  // Add any other public routes here, e.g., '/about', '/contact'
]);

// Define protected routes that require authentication
// If you have specific roles, you can create more matchers:
// const isAdminRoute = createRouteMatcher(['/admin(.*)']);
// const isPortalRoute = createRouteMatcher(['/dashboard(.*)', '/orders(.*)']);

export default clerkMiddleware(async (auth, request) => { // auth is the auth object, middleware can be async
  if (!isPublicRoute(request)) {
    await auth.protect(); // Call protect directly on the auth object, await if it's async
  }

  // Example of role-based protection (uncomment and adjust if needed)
  // if (isAdminRoute(request)) {
  //   await auth.protect((has) => { // Use auth object (from middleware params) here
  //     return has({ role: 'org:admin' }); // Or simply 'admin' if not using Clerk organizations
  //   });
  // }

  // }

  // Redirect logic based on userId has been moved to client-side components 
  // on /sign-in and /sign-up pages to avoid middleware type complexities.

  // If auth.protect() did not throw/redirect, or if it's a public route, continue.
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
