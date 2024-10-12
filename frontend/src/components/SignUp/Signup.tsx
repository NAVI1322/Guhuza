import signUpCall from "@/hooks/SignUpCall";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import FlickeringGrid from "../ui/flickering-grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "../loading /loader";

import { Toast } from "../toaster/toast";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, SetLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
 
    e.preventDefault();
    try {
      await signUpCall(email);
      Toast("Success","OTP sent Successfully","Undo");
      
    
      setStep(2);
    } catch (err) {
      console.error("Email submission failed:", err);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpCall(email, otp);
      setStep(3);
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
     await signUpCall(email, undefined, undefined, undefined, undefined, true); // Resend OTP

      Toast("OTP has sent again","Check your Mail inbox","undo");

    
    } catch (err) {
      console.error("Resending OTP failed:", err);
    }
  };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpCall(email, otp, role);
      setStep(4);
    } catch (err) {
      console.error("Role submission failed:", err);
    }
  };


  // handle password submit step 5
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        Toast("Failed","Password not matching");
        return;
      }

     const res =  await signUpCall(email, otp, role, password, confirmPassword);

     console.log(res);

     Toast("Success","Account Created Successfully","Undo");

      navigate('/login');



    } catch (err) {
      console.error("Password setup failed:", err);
      Toast("Failed","Something went Wrong");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="bg-white dark:bg-blue-800/20 shadow-lg rounded-lg p-6 sm:p-8 max-w-xs sm:max-w-sm w-full transform transition-transform duration-300 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Signup
        </h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="email"
              >
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
            {loading ? (
               <Loader />
             
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 rounded-md"
              >Send OTP</Button>
            )}
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="otp"
              >
                OTP:
              </label>
              <Input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 rounded-md"
            >
              Verify OTP
            </Button>
            <Button
              type="button"
              onClick={handleResendOtp}
              className="w-full text-blue-600 hover:text-blue-800"
            >
              Resend OTP
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleRoleSubmit}>
            <div className="mb-4">
              <Select onValueChange={setRole}>
                <SelectTrigger className="w-full bg-gray-600 hover:bg-gray-700 text-white mb-6 rounded-md">
                  <SelectValue placeholder="Who are you?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JOB_SEEKER">JOB_SEEKER</SelectItem>
                  <SelectItem value="RECRUITER">RECRUITER</SelectItem>
                  <SelectItem value="STAFFING_FIRM">STAFFING_FIRM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 rounded-md"
            >
              Set Role
            </Button>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="password"
              >
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
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password:
              </label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 rounded-md"
            >
              Create Account
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
