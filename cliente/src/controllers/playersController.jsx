import playerService from '../api/services/playerService.jsx';
import { usePlayers } from '../context/PlayersContext.jsx';

const playersController = {
    async getPlayers(params) {

        try {
            console.log('Fetching players with params:', params); // Log for debugging

            const players = await playerService.getPlayers(params);

            console.log('Fetched players:', players); // Log for debugging

            return players.data; 

        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    },

    async createPlayer(data) {
        try {

            const formmatedPlayer = {
                dni: data.dni,
                name: data.name,
                surname: data.surname,
                date_of_birth: data.dateOfBirth,
                gender: data.gender,
                parent_dni: data.parent_dni
            }

            console.log("Creating player with data:", formmatedPlayer);

            const newPlayer = await playerService.createPlayer(formmatedPlayer);
            return newPlayer;
        } catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    },

    async updatePlayer(dni, data) {
        try {
            const updatedPlayer = await playerService.updatePlayer(dni, data);
            return updatedPlayer;
        } catch (error) {
            console.error('Error updating player:', error);
            throw error;
        }
    },

    async deleteMatch(dni) {
        try {
            const result = await playerService.deletePlayer(dni);
            return result;
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    },
};

export default playersController;