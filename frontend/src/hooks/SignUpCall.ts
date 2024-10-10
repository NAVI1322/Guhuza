// this sends posts request to singup route with the email

import axios from 'axios';

const signUpCall = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/signup', {
      email: email,
      password: password,
      role: 'candidate',
    });
    return response.data; // Return the data from the API
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
