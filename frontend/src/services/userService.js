import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

// Get user profile
export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Update user profile
export const updateUserProfile = async (name, username) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/users/profile`,
            { name, username },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Change password
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/users/password`,
            { currentPassword, newPassword },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}