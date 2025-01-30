import React from "react";
import { SignIn } from "@clerk/react-router";

const Signin = () => {
  return (
    <div className="SignInPage h-full w-full flex items-center flex-col  justify-center">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default Signin;
