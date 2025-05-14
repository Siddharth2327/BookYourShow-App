import { axiosInstance } from "./index.js";

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post('http://localhost:8000/api/users/register', values);
    console.log('User Registered');
    return response.data
  } catch (error) {
    console.log('Registration error:', error.response?.data || error.message);
  }
};

export const LoginUser = async(values)=>{
  try{
    const response = await axiosInstance.post('http://localhost:8000/api/users/login', values);
    console.log('login successful');
    return response.data
  } catch(error){
    console.log(error);
  }
};