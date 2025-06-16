import playerService from '../api/services/playerService.jsx';
import { usePlayers } from '../context/PlayersContext.jsx';

const playersController = () => {

    const { updatePlayers, createPlayer } = usePlayers();

    const getPlayers = async (params) =>  {
        try {
            const players = await playerService.getPlayers(params);

            updatePlayers(players.data); // Update context with fetched players

            return players.data; 
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }

    const putPlayer = async (data) => {
        try {

            console.log(data)
            const formmatedPlayer = {
                player_dni: data.dni,
                name: data.name,
                surname: data.surname,
                date_of_birth: data.dateOfBirth,
                gender: data.gender,
                parent_dni: data.parent_dni
            }
            console.log("Creating player with data:", formmatedPlayer);
            const newPlayer = await playerService.createPlayer(formmatedPlayer);
            createPlayer(newPlayer); // Update context with the new player
            return newPlayer;
        } catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    }

    const updatePlayer = async (oldDni, updatedPlayerData) => {
        try {
            const updatedPlayer = await playerService.editPlayer(oldDni, updatedPlayerData);
            return updatedPlayer;
        } catch (error) {
            console.error('Error updating player:', error);
            throw error;
        }
    }

    const deletePlayer = async (dni) => {
        try {
            const result = await playerService.deletePlayer(dni);
            return result;
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    }

    const getChildrenOfParent = async (parentDni) => {
        try {
            const allPlayers = await getPlayers();

            const children = allPlayers.filter(p => Number(p.parent_dni) === Number(parentDni));
            
            return children

        } catch (error) {
            console.error('Error fetching children of parent:', error);
            return { success: false, message: error.message, data: [] };
        }
    };

    return {
        getPlayers,
        putPlayer,
        updatePlayer,
        deletePlayer,
        getChildrenOfParent
    }
};

export default playersController;