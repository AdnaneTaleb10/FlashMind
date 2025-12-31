import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

// Start study session
export const startStudySession = async (folderId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/study/sessions`,
            { folderId },
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

// End study session
export const endStudySession = async (sessionId, score) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/study/sessions/${sessionId}/end`,
            { score },
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

// Get study history
export const getStudyHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/study/sessions`, {
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