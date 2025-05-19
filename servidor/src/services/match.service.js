class MatchService {
    createMatch(matchData) {
      return { message: 'Match created', data: matchData };
    }
  
    getMatches(queryParams) {
      return { message: 'List of matches', filters: queryParams };
    }
  
    updateMatch(matchData) {
      return { message: 'Match updated', data: matchData };
    }
  
    deleteMatch(match_id) {
      return { message: 'Match deleted', match_id };
    }
  }

export default new MatchService();