const matchRepository = require('../repositories/match.repository');

class MatchService {
    createMatch(matchData) {

      // Check if the match already exists
      const existingMatch = matchRepository.matches.find(match => match.match_id === matchData.match_id);
      if (existingMatch) {
        return { message: 'Match already exists', data: existingMatch};
      }

      const newMatch = matchRepository.createMatch(matchData);

      if (!newMatch) {
        return null;
      }

      return newMatch;
    }
  
    getMatches(queryParams) {

      const allMatches = matchRepository.getMatches();

      const filteredMatches = allMatches.filter(match => {
        return Object.keys(queryParams).every(key => {
          return match[key] && match[key].toString() === queryParams[key].toString();
        });
      });
      
      return filteredMatches;
    }
  
    updateMatch(matchData) {

      const existingMatch = matchRepository.matches.find(match => match.match_id === matchData.match_id);
      
      if (!existingMatch) {
        return null;
      }

      const updatedMatch = matchRepository.updateMatch(matchData.match_id, matchData);

      return updatedMatch;
    }
  
    deleteMatch(match_id) {

      const deletedMatch = matchRepository.deleteMatch(match_id);

      if (!deletedMatch) {
        return null;
      }

      return deletedMatch
    }
  }

  module.exports = new MatchService();