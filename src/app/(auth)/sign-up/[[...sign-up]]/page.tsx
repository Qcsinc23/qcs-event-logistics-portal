import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
      {/* Adjust min-h based on header/footer height if needed */}
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
