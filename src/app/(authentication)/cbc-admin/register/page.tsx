'use client';

import { useState } from 'react';
import { z } from 'zod'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from "@/lib/supabase";

// Define the validation schema
const registrationSchema = z.object({
  fullName: z.string().nonempty('Full name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm password is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], 
});

export default function AdminRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

   
    try {
      registrationSchema.parse(formData); 
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || 'An error occurred');
        setIsLoading(false);
        return;
      }
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from('profile')
      .insert([
        { 
          id: data.user?.id,
          email: formData.email,
          is_admin: true
        }
      ]);

    if (profileError) {
      setError(profileError.message);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Registration</CardTitle>
          <CardDescription className="text-center">
            Create a new admin account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            {error && (
              <div className="flex items-center space-x-2 mt-4 text-red-600">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center space-x-2 mt-4 text-green-600">
                <CheckCircle size={16} />
                <span className="text-sm">Registration successful!</span>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
