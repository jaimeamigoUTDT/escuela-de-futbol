const {Player} = require('../models/player.model');

class playerRepository {
    players = [];

    createPlayer(playerData) {
        
        this.players.push(new Player(playerData));
        
        console.log(this.players);
        return playerData;

    }

    getPlayers() {
        return this.players;
    }

    updatePlayer(dni, playerData) {
        
        this.deletePlayer(dni);
        this.createPlayer(playerData);

        return playerData;
    }

    deletePlayer(dni) {
        const playerIndex = this.players.findIndex(player => player.dni === dni);

        if (playerIndex !== -1) {
            return this.players.splice(playerIndex, 1)[0];
        }
        return null;
    }
}

module.exports = new playerRepository();