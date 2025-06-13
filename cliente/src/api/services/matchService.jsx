import axios from 'axios';

const API_URL = 'http://localhost:5000/api/matches';

const matchService = {
    
    getMatches: async (params) => {
        try {
            
            const response = await axios.get(API_URL, { params });
            
            console.log('Fetched matches:', response.data); // Log for debugging
            return response.data;
        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    },

    createMatch: async (match) => {
        try {
            const response = await axios.post(API_URL, match);
            return response.data;
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    },

    deleteMatch: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting match:', error);
            throw error;
        }
    },

    editMatch: async (id, updatedMatch) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedMatch);
            return response.data;
        } catch (error) {
            console.error('Error editing match:', error);
            throw error;
        }
    }


};

export default matchService;