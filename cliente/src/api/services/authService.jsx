import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Replace with your backend URL

const authService = {
    // Validate user credentials
    login: async (userData) => {
        try {

            const response = await axios.post(`${API_URL}/login`, {userData});
            return response.data; // Return token or user data
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Create a new user
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {userData});
            return response.data; // Return created user data
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};

export default authService;