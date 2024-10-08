import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { useToast } from "@/hooks/use-toast"; // Import your custom toast hook
import { Button } from '../ui/button'; // Import your custom button component
import { Input } from '../ui/input'; // Import your custom input component
import verifyCall from '@/hooks/VerifyCall'; // Ensure this path is correct

const Verify2FA = () => {
  const { toast } = useToast(); // Hook for showing toast messages
  const navigate = useNavigate(); // Initialize useNavigate
  const [otp, setOtp] = useState(''); // State for storing OTP
  const [email, setEmail] = useState(''); // State for storing email
  const [password, setPassword] = useState(''); // State for storing password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyCall(email, password, otp); // Call the OTP verification function

      // Assuming response contains a success message and a token
      toast({ title: response.message, variant: 'default' });

      // Store the token in localStorage if you need to use it later
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      // Redirect to the dashboard on success
      navigate('/dashboard');
    } catch (err) {
      toast({ title: 'OTP verification failed. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">Verify OTP</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="otp">
              Enter OTP:
            </label>
            <Input 
              type="text" 
              id="otp"
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
              className="w-full border border-gray-300 dark:border-gray-600" 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verify2FA;
