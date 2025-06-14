const playerRepository = require('../repositories/player.repository');
const userRepository = require('../repositories/user.repository');

class PlayerService {

    // Helper method to resolve references in player data
    enrichPlayerData(player) {
      if (!player) return null;

      // Fetch related data
      const parent = userRepository.getUserById(player.parent_dni);
      
      return {
        ...player,
        parent: parent ? { ...parent } : null
      };
    }

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
      
      const enrichedPlayers = filteredPlayers.map(player => this.enrichPlayerData(player));

      return enrichedPlayers;
    }
  
    updatePlayer(dni, playerData) {

      const existingPlayer = playerRepository.players.find(player => player.dni === dni);
      
      if (!existingPlayer) {
        return null;
      }

      const updatedPlayer = playerRepository.updatePlayer(dni, playerData);

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