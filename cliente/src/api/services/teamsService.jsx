import api from '../axios';

const API_URL = 'http://localhost:5000/api/teams';

const teamsService = {
    getTeams: async (params = {}) => {
        try {
            const response = await api.get(API_URL, { params });
            // Backend likely returns { success, message, data }
            console.log('Fetched teams:', response.data); // Log for debugging
            return response.data.data; // Return the array of teams
        } catch (error) {
            console.error('Error fetching teams:', error);
            throw error;
        }
    },

    createTeam: async (teamData) => {
        try {
            const response = await api.post(API_URL, teamData);
            return response.data;
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    },

    editTeam: async (updatedTeamData) => {
        try {
            const response = await api.put(API_URL, updatedTeamData);
            return response.data;
        } catch (error) {
            console.error('Error updating team:', error);
            throw error;
        }
    },

    deleteTeam: async (id) => {
        try {
            const response = await api.delete(API_URL, {
                data: { "team_id":id }, // Send dni in the request body
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting team:', error);
            throw error;
        }
    },
};

export default teamsService;