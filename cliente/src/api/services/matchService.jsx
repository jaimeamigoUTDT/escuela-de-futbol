import api from '../axios';

const API_URL = 'https://escuela-de-futbol.onrender.com/api/matches';

const matchService = {

    getMatches: async (params = {}) => {
        try {
            const response = await api.get(API_URL, { params });
            console.log('Fetched matches:', response.data); // Log for debugging
            // If your backend wraps data like { success, message, data: [...] }, return only the array:
            // return response.data.data;
            // Otherwise, return as needed:
            return response.data;
        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    },

    createMatch: async (match) => {
        try {
            const response = await api.post(API_URL, match);
            return response.data;
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    },

    deleteMatch: async (id) => {
        try {
            const response = await api.delete(API_URL, {
                data: { "match_id":id }, // Send dni in the request body
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting match:', error);
            throw error;
        }
    },

    editMatch: async (id, updatedMatch) => {
        try {
            const response = await api.put(`${API_URL}/${id}`, updatedMatch);
            return response.data;
        } catch (error) {
            console.error('Error editing match:', error);
            throw error;
        }
    }

};

export default matchService;