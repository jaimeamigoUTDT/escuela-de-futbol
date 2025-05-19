class PlayerService {
    createPlayer(playerData) {
      return { message: 'Player created', data: playerData };
    }
  
    getPlayers(queryParams) {
      return { message: 'List of players', filters: queryParams };
    }
  
    updatePlayer(playerData) {
      return { message: 'Player updated', data: playerData };
    }
  
    deletePlayer(dni) {
      return { message: 'Player deleted', dni };
    }
  }

export default new PlayerService();