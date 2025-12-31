import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if(!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined in .env file');
}

// Get all folders
export const getAllFolders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/folders`, {
            withCredentials: true // For session-based auth
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

// Get recent folders (last 3)
export const getRecentFolders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/folders/recent`, {
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

// Create folder
export const createFolder = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/folders`,
            { name },
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

// Update folder
export const updateFolder = async (folderId, name) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/folders/${folderId}`,
            { name },
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

// Delete folder
export const deleteFolder = async (folderId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/folders/${folderId}`, {
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

// Get folder cards
export const getFolderCards = async (folderId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/folders/${folderId}/cards`, {
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