import React from "react";
import { SignUp } from "@clerk/react-router";

const SignUpPage = () => {
  return (
    <div className=" flex h-full w-full flex-col justify-center items-center">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
