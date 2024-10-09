import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { loginCall } from '@/hooks/LoginCall'; // Ensure this path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginCall(email, password);
      setMessage(response.message);
      setError(null);
      // Redirect to the Verify2FA page after successful login and OTP initiation
      navigate('/verify-2fa');
    } catch (err) {
      setMessage(null);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">Welcome Back!</h2>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className='mb-4'>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 blwslock w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
          <div className="">
              New here?
              <Link to="/signup" className="ml-2 text-blue-300  hover:text-blue-500">Sign up</Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
