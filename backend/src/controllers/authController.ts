import { Request, Response } from 'express';
import { signupService, loginService, verifyOtpService } from '../services/authService';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await signupService(email, password, role);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await loginService(email, password); // Sends OTP on successful login
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Verify OTP and generate final token
export const verify2FA = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const token = await verifyOtpService(email, otp);
    res.status(200).json({ message: '2FA verified successfully', token });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
