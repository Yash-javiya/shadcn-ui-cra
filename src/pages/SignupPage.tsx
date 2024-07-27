// src/pages/SignupPage.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "@/components/SignupForm";
import { SignupProvider } from "@/context/SignupContext";
import { ModeToggle } from "@/components/mode-toggle";

const SignupPage: React.FC = () => {
  return (
    <SignupProvider>
      <div className="flex justify-center items-center min-h-screen">
        <ModeToggle />
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </SignupProvider>
  );
};

export default SignupPage;
