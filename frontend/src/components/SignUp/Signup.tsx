import signUpCall from '@/hooks/SignUpCall';
import React, { useState } from 'react';
import { Input } from '../ui/input'; // Import custom Input component
import { ToastProvider } from '../ui/toast'; // Import Toast component
import { useToast } from "@/hooks/use-toast";
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


const Signup = () => {
  const { toast } = useToast(); // Hook for showing toast messages
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUpCall(email, password);
      toast({ title: response.message, variant: 'default' });

      // Redirect to login route after successful signup
      navigate('/login'); // Use navigate to redirect to the login route

      // Clear input fields
      setEmail('');
      setPassword('');
    } catch (err) {
      toast({ title: 'Signup failed. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <ToastProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full transform transition-transform duration-300 ">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Signup</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600"
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
                className="w-full border border-gray-300 dark:border-gray-600"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6"
            >
              Sign Up
            </Button>
            <div className="">
              Already have an account?
              <Link to="/login" className="ml-2 text-blue-300  hover:text-blue-500">Login</Link>
            </div>
          </form>
        </div>
      </div>
      
    </ToastProvider>
  );
};

export default Signup;
