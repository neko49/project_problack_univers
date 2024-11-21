import axios from 'axios';
const API_BASE_URL = "https://projectproblackunivers-production.up.railway.app";

export { API_BASE_URL }; // Export nommé pour API_BASE_URL

// Vos fonctions API
export const registerUser = async (userData) => {
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
    });

    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateUserProfile = async (token, updatedData) => {
    const formData = new FormData();
    Object.keys(updatedData).forEach((key) => {
        formData.append(key, updatedData[key]);
    });

    try {
        const response = await axios.put(`${API_BASE_URL}/api/users/profile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
