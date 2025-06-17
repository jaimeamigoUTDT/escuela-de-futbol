import api from '../axios';

const API_URL = 'https://escuela-de-futbol.onrender.com/api/players';

const playerService = {

    getPlayers: async (params = {}) => {
        try {
            const response = await api.get(API_URL, { params });
            console.log('Fetched players:', response.data); // Log for debugging
            return response.data;
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    },
    
    createPlayer: async (player) => {
        try {

            const response = await api.post(API_URL, player);
            return response.data;
        } catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    },

    deletePlayer: async (dni) => {
        try {
            const response = await api.delete(API_URL, {
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
            // It is usually better to send { ...updatedPlayerData, dni } as the body, unless your backend expects { dni, updatedPlayerData }
            const response = await api.put(API_URL, { dni, ...updatedPlayerData });
            return response.data;
        } catch (error) {
            console.error('Error editing player:', error);
            throw error;
        }
    }

};

export default playerService;