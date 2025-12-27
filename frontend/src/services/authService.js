import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    }catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        }else{
            throw new Error('Network error. Please try again.');
        }
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        return response.data;
    }catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        }else{
            throw new Error('Network error. Please try again.');
        }
    }
}

export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    }catch(error){
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error)
        }else{
            throw new Error('Network error. Please try again.');
        }
    }
}