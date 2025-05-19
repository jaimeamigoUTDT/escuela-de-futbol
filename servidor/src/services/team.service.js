class TeamService {
    createTeam(teamData) {
      return { message: 'Team created', data: teamData };
    }
  
    getTeams(queryParams) {
      return { message: 'List of teams', filters: queryParams };
    }
  
    updateTeam(teamData) {
      return { message: 'Team updated', data: teamData };
    }
  
    deleteTeam(team_id) {
      return { message: 'Team deleted', team_id };
    }
  }

export default new TeamService();