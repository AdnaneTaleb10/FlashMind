import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

export const getDashboardData = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/${userId}`);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}