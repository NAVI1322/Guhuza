import axios from 'axios';

const signUpCall = async (email: string, otp?: string, role?: string, password?: string, confirmPassword?: string, resendOtp?: boolean) => {
  try {
    // Step 1: Send email to get OTP
    if (!otp && !role && !password) {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        step: 'email',
        email: email,
      });
      return response.data; // Return the data from the API (OTP sent)
    }

    // Step 2: Verify OTP
    if (otp && !role && !password) {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        step: 'verifyOtp',
        email: email,
        otp: otp,
      });
      return response.data; // Return the data from the API (OTP verified)
    }

    // Resend OTP
    if (resendOtp) {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        step: 'resendOtp',
        email: email,
      });
      return response.data; // Return the data from the API (OTP resent)
    }

    // Step 3: Set Role
    if (otp && role && !password) {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        step: 'setRole',
        email: email,
        role: role,
      });
      return response.data; // Return the data from the API (Role set)
    }

    // Step 4: Create User with Password
    if (otp && role && password && confirmPassword) {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        step: 'createUser',
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      });
      return response.data; // Return the data from the API (User created)
    }
    
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export default signUpCall;
