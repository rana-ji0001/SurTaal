import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  return (
    <form className="space-y-4">
      <Input placeholder="Username or Email" />
      <Input
        type="password"
        placeholder="Password"
      />

      <Button className="w-full">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
