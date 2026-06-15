import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from '@/services/authServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: "",
    password: ""
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const data = await loginUser(formData);
      if (data.user) {
        setSuccess("User logged in successfully")
        setTimeout(() => {
          navigate("/dashboard")
        }, 1000)
        console.log(data);
      } else {
        setError("Invalid Credentials!")

      }


    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");

    }
    finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="loginId"
          value={formData.loginId}
          onChange={handleChange}
          placeholder="Username or Email"
          required
        />
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {success && (
        <Alert className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm shadow-lg">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm shadow-lg">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  )
}

export default LoginForm
