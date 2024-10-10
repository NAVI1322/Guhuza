// the signupservice sends an otp to the user email genearted in server and proceeds to match it with the otp generated on server and then it gives a token
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { JWT_SECRET } from '../config';
import { sendVerificationEmail } from '../utils/emailSender';
import { Prisma } from '@prisma/client'; // Make sure to import Prisma

// Generate random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


export const signupService = async (email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role }
    });
    return user;
  } catch (error) {
    // Use type assertion to specify the type of error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma error codes
      if (error.code === 'P2002') { // Prisma unique constraint error code
        throw new Error('Email already in use');
      }
    }
    
    // Generic error handling
    throw new Error('Error creating user');
  }
};


export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  // Generate OTP for 2FA
  const otp = generateOTP();
  const expiryTime = new Date(Date.now() + 1 * 60 * 1000); // OTP valid for 1 minutes

  // Save OTP and expiry time temporarily to the user record
  await prisma.user.update({
    where: { email },
    data: { otp, otpExpiry: expiryTime }  // Assuming an OTP field is added to the User model
  });

  // Send OTP via email
  await sendVerificationEmail(email, otp);

  return { message: 'OTP sent to email' };
};

// Verify the OTP entered by the user
export const verifyOtpService = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.otp !== otp) throw new Error('Invalid OTP');

  const currentTime = new Date();

  // Check if OTP has expired
  if (user.otpExpiry && currentTime > new Date(user.otpExpiry)) {
    throw new Error('OTP has expired');
  }

  // Clear OTP after successful verification
  await prisma.user.update({
    where: { email },
    data: { otp: null, otpExpiry: null }  // Clear OTP and expiry time
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};
