import matchService from '../api/services/matchService.jsx';
import {useMatches} from '../context/MatchesContext.jsx'; // Adjust path as necessary
 
export const matchesController = () => {

    const { getStoredMatches, saveMatch, deleteAllMatches} = useMatches();

    const getMatches = async (params) => {

        try {
    
            const fetchedMatches = await matchService.getMatches(params);

            for (const match of fetchedMatches.data) {
                saveMatch(match);
            }

            const matches = fetchedMatches.data; // Get updated matches from context

            return matches; 

        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    };

    const createMatch = async (data) => {
        try {

            const formmatedMatch = {
                match_id: data.id,
                fecha: data.date,
                hora: data.time,
                rival: data.rivalTeam,
                category_id: data.category_id,
                cancha_id: data.cancha_id
            }

            console.log("Creating match with data:", formmatedMatch);

            const newMatch = await matchService.createMatch(formmatedMatch);
            return newMatch;
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    };

    const updateMatch = async (id, data) => {
        try {
            const updatedMatch = await matchService.updateMatch(id, data);
            return updatedMatch;
        } catch (error) {
            console.error('Error updating match:', error);
            throw error;
        }
    };

    const deleteMatch = async (id) => {
        try {
            const result = await matchService.deleteMatch(id);
            return result;
        } catch (error) {
            console.error('Error deleting match:', error);
            throw error;
        }
    };

    return {
        getMatches,
        createMatch,
        updateMatch,
        deleteMatch
    };
};

