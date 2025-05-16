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

// get valid user by for checking the bearer token
export const GetCurrentUser = async()=>{
  try{
    const response = await axiosInstance.get('http://localhost:8000/api/users/validate-user')
    return response.data
  } catch(error){
    console.log(error)
  }
};
