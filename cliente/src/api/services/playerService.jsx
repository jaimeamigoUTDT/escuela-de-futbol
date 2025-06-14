import axios from 'axios';

const API_URL = 'http://localhost:5000/api/players';

const playerService = {
    
    getPlayers: async (params) => {
        try {
            const response = await axios.get(API_URL, {params});
            
            console.log('Fetched players:', response.data); // Log for debugging
            
            return response.data;
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    },
    
    createPlayer: async (player) => {
        try {
            const response = await axios.post(API_URL, player);
            return response.data;
        } catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    },

    deletePlayer: async (dni) => {
    try {
        const response = await axios.delete(API_URL, {
            data: { dni }, // Send dni in the request body
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting player:', error);
        throw error;
    }
},

    editPlayer: async (dni, updatedPlayerData) => {
        try {
            const response = await axios.put(API_URL, {dni, updatedPlayerData});
            return response.data;
        } catch (error) {
            console.error('Error editing player:', error);
            throw error;
        }
    }


};

export default playerService;