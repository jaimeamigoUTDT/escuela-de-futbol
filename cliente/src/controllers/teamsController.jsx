import { useTeams } from '../context/TeamsContext'; // Adjust the path as necessary
import teamsService from '../api/services/teamsService'; // Adjust the path to your service

export const teamsController = () => {

    const { saveTeam } = useTeams(); // Adjust path to TeamsContext

    const fetchTeams = async ({params} = {}) => {

        try {
            const teams = await teamsService.getTeams(params);

            for (const team of teams) {
                // Ensure each team has a players array
                saveTeam(team);
            }

            return teams; 

        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }

    const createTeam = async (teamData) => {
        try {
            const newTeam = await teamsService.createTeam(teamData);

            console.log('New team created:', newTeam); // Log for debugging

            saveTeams(newTeam); // Save the new team to context or state

            return newTeam;
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    }


    return {fetchTeams, createTeam}
};