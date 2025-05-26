const teamRepository = require('../repositories/team.repository');

class TeamService {
    createTeam(teamData) {

      // Check if the team already exists
      const existingTeam = teamRepository.teams.find(team => team.team_id === teamData.team_id);
      if (existingTeam) {
        return { message: 'Team already exists', data: existingTeam};
      }

      const newTeam = teamRepository.createTeam(teamData);

      if (!newTeam) {
        return null;
      }

      return newTeam;
    }
  
    getTeams(queryParams) {

      const allTeams = teamRepository.getTeams();

      const filteredTeams = allTeams.filter(team => {
        return Object.keys(queryParams).every(key => {
          return team[key] && team[key].toString() === queryParams[key].toString();
        });
      });
      
      return filteredTeams;
    }
  
    updateTeam(teamData) {

      const existingTeam = teamRepository.teams.find(team => team.team_id === teamData.team_id);
      
      if (!existingTeam) {
        return null;
      }

      const updatedTeam = teamRepository.updateTeam(teamData.team_id, teamData);

      return updatedTeam;
    }
  
    deleteTeam(team_id) {

      const deletedTeam = teamRepository.deleteTeam(team_id);

      if (!deletedTeam) {
        return null;
      }

      return deletedTeam
    }
  }

  module.exports = new TeamService();