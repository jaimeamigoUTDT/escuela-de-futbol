// services/team.service.js
const teamRepository = require('../repositories/team.repository');
const matchRepository = require('../repositories/match.repository');
const categoryRepository = require('../repositories/category.repository');
const playerRepository = require('../repositories/player.repository');

class TeamService {
  // Helper method to enrich team data with match, category, and players
  async enrichTeamData(team) {
    if (!team) return null;
    // Fetch related data
    const match = matchRepository.getMatchById(team.match_id);
    const category = categoryRepository.getCategoryById(team.category_id);

    console.log(team.players);

    const players = team.players
      ? team.players.map((player_id) => playerRepository.getPlayerByDni(player_id)).filter(Boolean)
      : [];

    return {
      ...team,
      match: match || null,
      category: category || null,
      players: players || [],
    };
  }

  async createTeam(teamData) {
    // Check if the team already exists
    const existingTeam = teamRepository.teams.find((team) => team.team_id === teamData.team_id);
    if (existingTeam) {
      const enrichedTeam = await this.enrichTeamData(existingTeam);
      return { message: 'Team already exists', data: enrichedTeam };
    }

    const newTeam = teamRepository.createTeam(teamData);
    if (!newTeam) {
      return null;
    }

    return this.enrichTeamData(newTeam);
  }

  async getTeams(queryParams) {
    const allTeams = teamRepository.getTeams();

    // Filter teams based on query parameters
    const filteredTeams = allTeams.filter((team) =>
      Object.keys(queryParams).every((key) => {
        // Handle nested fields (e.g., match.date, category.name)
        if (key.includes('.')) {
          const [parent, child] = key.split('.');
          return team[parent]?.[child]?.toString() === queryParams[key].toString();
        }
        return team[key]?.toString() === queryParams[key].toString();
      })
    );

    // Enrich each team with related data
    const enrichedTeams = await Promise.all(filteredTeams.map((team) => this.enrichTeamData(team)));
    
    return enrichedTeams;
  }

  async updateTeam(teamData) {
    const existingTeam = teamRepository.teams.find((team) => team.team_id === teamData.team_id);
    if (!existingTeam) {
      return null;
    }

    const updatedTeam = teamRepository.updateTeam(teamData.team_id, teamData);
    if (!updatedTeam) {
      return null;
    }

    return this.enrichTeamData(updatedTeam);
  }

  async deleteTeam(team_id) {
    const deletedTeam = teamRepository.deleteTeam(team_id);
    if (!deletedTeam) {
      return null;
    }

    return this.enrichTeamData(deletedTeam);
  }
}

module.exports = new TeamService();