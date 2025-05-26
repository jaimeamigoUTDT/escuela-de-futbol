const {Match} = require('../models/match.model');

class matchRepository {
    matches = [];

    createMatch(matchData) {
        
        this.matches.push(new Match(matchData));
        
        console.log(this.matches);
        return matchData;

    }

    getMatches() {
        return this.matches;
    }

    updateMatch(match_id, matchData) {
        
        this.deleteMatch(match_id);
        this.createMatch(matchData);

        return matchData;
    }

    deleteMatch(match_id) {
        const matchIndex = this.matches.findIndex(match => match.match_id === match_id);

        if (matchIndex !== -1) {
            return this.matches.splice(matchIndex, 1)[0];
        }
        return null;
    }
}

module.exports = new matchRepository();