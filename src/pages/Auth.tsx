
import { SignIn } from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <SignIn path="/auth" routing="path" signUpUrl="/auth" afterSignInUrl="/process" />
    </div>
  );
};

export default Auth;
