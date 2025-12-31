import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

// Create flashcard
export const createFlashcard = async (folderId, frontText, backText) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/folders/${folderId}/cards`,
            { frontText, backText },
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

// Update flashcard
export const updateFlashcard = async (cardId, frontText, backText) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/cards/${cardId}`,
            { frontText, backText },
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

// Delete flashcard
export const deleteFlashcard = async (cardId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/cards/${cardId}`, {
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