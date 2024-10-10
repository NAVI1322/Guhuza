import { sendVerificationEmail } from '../utils/emailSender';
import { PrismaClient, Prisma } from '@prisma/client'; // Combine imports for better readability
import bcrypt from 'bcrypt';

// In-memory store for OTPs
const inMemoryOTPStore: { [key: string]: { otp: string, expiry: number } } = {}; 

// Initialize Prisma Client
const prisma = new PrismaClient();

// Generate a random OTP
const generateOTP = (length: number = 6): string => {
  if (length < 1) {
    throw new Error('OTP length must be at least 1');
  }
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  return otp.toString().slice(0, length); // Ensure it is the correct length
};

// Service to send OTP to email
export const sendOTPService = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already exists. Please use a different email.');
  }

  const otp = generateOTP();
  const expiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  // Save OTP and expiry time in memory
  inMemoryOTPStore[email] = { otp, expiry };

  // Send OTP via email
  await sendVerificationEmail(email, otp);

  return { message: 'OTP sent to your email' };
};

// Service to verify the OTP
export const verifyOtpService = async (email: string, otp: string) => {
  const otpData = inMemoryOTPStore[email];

  if (!otpData) throw new Error('No OTP sent to this email');

  // Check if OTP matches and has not expired
  if (otpData.otp !== otp) throw new Error('Invalid OTP');
  if (Date.now() > otpData.expiry) throw new Error('OTP has expired');

  // Clear the OTP after verification
  delete inMemoryOTPStore[email];

  return { message: 'OTP verified successfully' };
};

// Service to set the user role
export const setRoleService = async (email: string, role: string) => {
  const allowedRoles = ['JOB_SEEKER', 'RECRUITER', 'STAFFING_FIRM'];

  if (!allowedRoles.includes(role)) {
    throw new Error('Invalid role. Choose either "JOB_SEEKER", "RECRUITER", or "STAFFING_FIRM".');
  }

  return { message: `Role set to ${role}` };
};

// Service to create a user
export const createUserService = async (email: string, password: string, role: 'JOB_SEEKER' | 'RECRUITER' | 'STAFFING_FIRM') => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
    
    return { message: 'User created successfully', user };
  } catch (error) {
    // Handle Prisma error for unique email constraint
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('Email already in use');
    }
    
    throw new Error('Error creating user');
  }
};
