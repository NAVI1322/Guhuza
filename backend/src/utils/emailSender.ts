// backend/src/utils/emailSender.ts
import nodemailer from 'nodemailer'

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Very That\'s You',
    text: `Your 2FA verification code from Anubhav for Guhuza is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};