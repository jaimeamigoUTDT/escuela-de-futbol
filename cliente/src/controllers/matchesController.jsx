import matchService from '../api/services/matchService.jsx';
import { useMatches } from '../context/MatchesContext.jsx';

const matchesController = {
    async getMatches(params) {

        try {
            console.log('Fetching matches with params:', params); // Log for debugging

            const matches = await matchService.getMatches(params);

            console.log('Fetched matches:', matches); // Log for debugging

            return matches.data; 

        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    },

    async createMatch(data) {
        try {
            const newMatch = await matchService.createMatch(data);
            return newMatch;
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    },

    async updateMatch(id, data) {
        try {
            const updatedMatch = await matchService.updateMatch(id, data);
            return updatedMatch;
        } catch (error) {
            console.error('Error updating match:', error);
            throw error;
        }
    },

    async deleteMatch(id) {
        try {
            const result = await matchService.deleteMatch(id);
            return result;
        } catch (error) {
            console.error('Error deleting match:', error);
            throw error;
        }
    },
};

export default matchesController;