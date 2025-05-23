const playerRepository = require('../repositories/player.repository');

class PlayerService {
    createPlayer(playerData) {

      // Check if the player already exists
      const existingPlayer = playerRepository.players.find(player => player.dni === playerData.dni);
      if (existingPlayer) {
        return { message: 'Player already exists', data: existingPlayer };
      }

      const newPlayer = playerRepository.createPlayer(playerData);

      if (!newPlayer) {
        return null;
      }

      return newPlayer;
    }
  
    getPlayers(queryParams) {

      const allPlayers = playerRepository.getPlayers();

      const filteredPlayers = allPlayers.filter(player => {
        return Object.keys(queryParams).every(key => {
          return player[key] && player[key].toString() === queryParams[key].toString();
        });
      });
      
      return filteredPlayers;
    }
  
    updatePlayer(playerData) {

      const existingPlayer = playerRepository.players.find(player => player.dni === playerData.dni);
      
      if (!existingPlayer) {
        return null;
      }

      const updatedPlayer = playerRepository.updatePlayer(playerData.dni, playerData);

      return updatedPlayer;
    }
  
    deletePlayer(dni) {

      const deletedPlayer = playerRepository.deletePlayer(dni);

      if (!deletedPlayer) {
        return null;
      }

      return deletedPlayer
    }
  }

  module.exports = new PlayerService();