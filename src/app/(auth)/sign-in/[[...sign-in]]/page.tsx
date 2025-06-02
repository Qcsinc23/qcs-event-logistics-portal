"use client"; // Required for hooks like useUser and useEffect

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Ensure dependencies are loaded and user state is known
    if (isLoaded && isSignedIn) {
      router.push('/dashboard'); // Or your desired redirect path after login
    }
  }, [isLoaded, isSignedIn, router]);

  // Optional: Show a loading state or null while checking auth status
  // This prevents a flash of the SignIn component if user is already signed in.
  if (!isLoaded || isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <p>Loading...</p> {/* Or a spinner component */}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
      {/* Adjust min-h based on header/footer height if needed */}
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
