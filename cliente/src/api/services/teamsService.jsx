import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teams';

const teamsService = {

    getTeams: async (params) => {
        try {
            const response = (await axios.get(API_URL, { params })).data;
            
            console.log('Fetched teams:', response.data); // Log for debugging
            
            return response.data;

        } catch (error) {
            console.error('Error fetching teams:', error);
            throw error;
        }
    },

    createTeam: async (teamData) => {
        try {
            const response = await axios.post(API_URL, teamData);
            return response.data;
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    },

    editTeam: async (updatedTeamData) => {
        try {
            const response = await axios.put(`${API_URL}`, updatedTeamData);
            return response.data;
        } catch (error) {
            console.error('Error updating team:', error);
            throw error;
        }
    },

}

export default teamsService;