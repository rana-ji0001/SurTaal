import LoginForm from "@/components/Auth/LoginForm";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src="/banner.png"
          alt="SurTaal"
          className="h-screen w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username or email to access your account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
