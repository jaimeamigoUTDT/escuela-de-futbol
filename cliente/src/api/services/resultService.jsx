import axios from 'axios';

const API_URL = 'http://localhost:5000/api/results';

const resultService = {
    
    getResults: async (params) => {
        try {
            const response = await axios.get(API_URL, { params });
            
            console.log('Fetched results:', response.data); // Log for debugging
            return response.data;
        } catch (error) {
            console.error('Error fetching results:', error);
            throw error;
        }
    },

    createResult: async (result) => {
        try {
            const response = await axios.post(API_URL, result);
            return response.data;
        } catch (error) {
            console.error('Error creating result:', error);
            throw error;
        }
    },

    deleteResult: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting result:', error);
            throw error;
        }
    },

    editResult: async (id, updatedResult) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedResult);
            return response.data;
        } catch (error) {
            console.error('Error editing result:', error);
            throw error;
        }
    }


};

export default resultService;