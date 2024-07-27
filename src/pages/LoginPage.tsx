// src/pages/LoginPage.tsx
import React from "react";
import { LoginProvider } from "@/context/LoginContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";
import { ModeToggle } from "@/components/mode-toggle";

const LoginPage: React.FC = () => {
  return (
    <LoginProvider>
      <div className="flex justify-center items-center min-h-screen">
        <ModeToggle />
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </LoginProvider>
  );
};

export default LoginPage;
