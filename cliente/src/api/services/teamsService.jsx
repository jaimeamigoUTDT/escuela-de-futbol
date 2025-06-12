import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teams';

const teamsService = {

    getTeams: async (params) => {
        try {
            console.log('Fetching teams with params:', params); // Log for debugging
            
            const response = await axios.get(API_URL, { params });
            
            console.log('Fetched teams:', response.data.data); // Log for debugging
            
            return response.data.data;
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

}

export default teamsService;