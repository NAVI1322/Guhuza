import { Request, Response } from 'express';
import { sendOTPService, verifyOtpService, setRoleService, createUserService, loginService } from '../services/authService';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { step, email, otp, role, password, confirmPassword ,firstName, lastName , companyName} = req.body;

  try {
    // Step 1: Send OTP to email
    if (step === 'email') {
    await sendOTPService(email);
      
      res.status(200).json({ message: 'OTP sent to your email' });
      return;
    }

    // Step 2: Verify OTP
    if (step === 'verifyOtp') {
      await verifyOtpService(email, otp);
      res.status(200).json({ message: 'OTP verified successfully' });
      return;
    }

    // Step 3: Resend OTP
    if (step === 'resendOtp') {
      await sendOTPService(email);
      res.status(200).json({ message: 'OTP resent to your email' });
      return;
    }

    // Step 4: Set Role (JOB_SEEKER or RECRUITER)
    if (step === 'setRole') {
      await setRoleService(email, role);
      res.status(200).json({ message: `Role set to ${role}` });
      return;
    }


    // Step 5: Create User with Password
    if (step === 'createUser') {

      if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match' });
        return;
      }

      console.log(companyName + " in auth controller"); 
      const user = await createUserService(email, password, role,firstName,lastName,companyName);
      res.status(201).json({ message: 'User created successfully', user });
      return;
    }

    // If no valid step is provided
    res.status(400).json({ message: 'Invalid step' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    const response = await loginService(email, password);

    if(response.success!=true)
      res.status(400).json({
    Status:"failed",
    message:"login failed/ Email or password is incorrect"})

    else
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


