import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY =
  "pk_test_ZWFzeS1mYWxjb24tMjEuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout py-[16px] px-[64px]   h-[100vh] flex  flex-col">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center flex-row">
              <img
                src="src\assets\logo.png
          "
                className="w-10 h-10"
              />
              <span>AI</span>
            </Link>
            <div className="user">
              <header>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
            </div>
          </header>
          <main className="flex-1  overflow-hidden">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
