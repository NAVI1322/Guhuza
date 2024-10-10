// email from here goes to signupcall hooks that sends the email to the signup route that called the signupserivce function

import signUpCall from '@/hooks/SignUpCall';
import React, { useState } from 'react';
import { Input } from '../ui/input'; // Import custom Input component
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import FlickeringGrid from '../ui/flickering-grid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUpCall(email, password);
      alert(response.email)
      // Redirect to login route after successful signup
      navigate('/login'); // Use navigate to redirect to the login route

      // Clear input fields
      setEmail('');
      setPassword('');
    } catch (err) {
      // Handle signup error here if needed (e.g., alert user)
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      {/* Signup Form Container */}
      <div className="bg-white dark:bg-blue-800/20 shadow-lg rounded-lg p-6 sm:p-8 max-w-xs sm:max-w-sm w-full transform transition-transform duration-300 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <Select>
  <SelectTrigger className="w-full bg-gray-600 hover:bg-gray-700 text-white mb-6 rounded-md">
    <SelectValue placeholder="Who are you?" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Job Seeker</SelectItem>
    <SelectItem value="dark">Recruiter</SelectItem>
    <SelectItem value="system">Staffing Firm</SelectItem>
  </SelectContent>
</Select>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
   
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 rounded-md"
          >
            Sign Up
          </Button>
          <div className="text-center">
            Already have an account?
            <Link to="/login" className="ml-2 text-blue-300 hover:text-blue-500">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
