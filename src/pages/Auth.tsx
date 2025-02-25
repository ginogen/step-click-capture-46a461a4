
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      {mode === "sign-up" ? (
        <SignUp routing="path" path="/auth" signInUrl="/auth" afterSignUpUrl="/process" />
      ) : (
        <SignIn routing="path" path="/auth" signUpUrl="/auth?mode=sign-up" afterSignInUrl="/process" />
      )}
    </div>
  );
};

export default Auth;
