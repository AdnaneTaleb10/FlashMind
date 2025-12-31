import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
            withCredentials: true
        });
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
        const response = await axios.post(`${API_BASE_URL}/auth/login`,
            { email, password },
            {withCredentials: true}
    );
        return response.data;
    }catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        }else{
            throw new Error('Network error. Please try again.');
        }
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        }else{
            throw new Error('Network error. Please try again.');
        }
    }
}