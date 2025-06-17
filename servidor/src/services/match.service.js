const matchRepository = require('../repositories/match.repository');
const canchaRepository = require('../repositories/cancha.repository');
const categoryRepository = require('../repositories/category.repository');

class MatchService {

  enrichMatchData(match) {
    if (!match) return null;
    // Fetch related data if necessary
    const cancha = canchaRepository.getCanchaById(match.cancha_id);

    console.log(cancha)

    const formattedCancha = {
      cancha_id: cancha ? cancha.cancha_id : null,
      address: cancha ? cancha.address : null,
      shoe_type: cancha ? cancha.shoe_type : null,
      size: cancha ? cancha.size : null,
      buffet_available: cancha.buffet_available ? "true" : "false",
      parking_available: cancha.parking_available ? "true" : "false",
    }

    const category = categoryRepository.getCategoryById(match.category_id);

    return {
      ...match,
      category: category || null,
      cancha: formattedCancha || [],
    };
    
  
  }

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
  
    getMatches(queryParams)  {

      const allMatches = matchRepository.getMatches();

      console.log('All Matches:', allMatches);

      delete queryParams.authToken;
      delete queryParams.dni;

      const filteredMatches = allMatches.filter(match => {
        return Object.keys(queryParams).every(key => {
          return match[key] && match[key].toString() === queryParams[key].toString();
        });
      });

      for (let i = 0; i < filteredMatches.length; i++) {
        filteredMatches[i] = this.enrichMatchData(filteredMatches[i]);
      }

      console.log(filteredMatches)

      return filteredMatches;
    }
  
    updateMatch(matchData) {

      const existingMatch = matchRepository.matches.find(match => match.match_id === matchData.match_id);
      
      console.log('Existing Match:', existingMatch);

      if (!existingMatch) {
        return null;
      }

      matchRepository.updateMatch(matchData.match_id, matchData);

      console.log('Updated Match:', updatedMatch);

      const matches = matchRepository.getMatches();

      return matches;
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