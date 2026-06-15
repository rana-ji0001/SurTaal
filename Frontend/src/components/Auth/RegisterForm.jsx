import React from 'react'
import { useState } from 'react'
import { registerUser } from '@/services/authServices'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";



const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const data = await registerUser(formData);
            setSuccess("User Registered successfully");
            setFormData({
                username: "",
                email: "",
                password: "",
                role: "user",
            });



            console.log(data);
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />

                <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    required
                />

                <Input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    required
                    minLength={6}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registering..." : "Register Yourself"}
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

export default RegisterForm
