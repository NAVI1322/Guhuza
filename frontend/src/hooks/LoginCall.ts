import axios from 'axios';

const loginCall = async (email: string, password: string) => {
  console.log("Logging in with:", email); // Debug log
  try {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email: email,
      password: password,
    });
    return response.data; // Return the response data
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};



export {loginCall};