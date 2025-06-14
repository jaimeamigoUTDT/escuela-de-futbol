// services/team.service.js
const teamRepository = require('../repositories/team.repository');
const matchRepository = require('../repositories/match.repository');
const categoryRepository = require('../repositories/category.repository');
const playerRepository = require('../repositories/player.repository');
const canchaRepository = require('../repositories/cancha.repository');

class TeamService {
  // Helper method to enrich team data with match, category, and players
  enrichTeamData(team) {
    if (!team) return null;
    // Fetch related data
    const match = matchRepository.getMatchById(team.match_id);
    const category = categoryRepository.getCategoryById(team.category_id);
    const cancha = canchaRepository.getCanchaById(match?.cancha_id);

    const players = team.players_ids
      ? team.players_ids.map((player_id) => playerRepository.getPlayerByDni(player_id)).filter(Boolean)
      : [];

    
    return {
      ...team,
      match: match ? { ...match, cancha: cancha || null } : null,
      category: category || null,
      players: players || [],
    };
  }

  createTeam(teamData) {
    // Check if the team already exists
    const existingTeam = teamRepository.teams.find((team) => team.team_id === teamData.team_id);
    
    if (existingTeam) {
      const enrichedTeam = this.enrichTeamData(existingTeam);
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
    const enrichedTeams = filteredTeams.map((team) => this.enrichTeamData(team));

    return enrichedTeams;
  }

  async updateTeam(teamData) {
    const existingTeam = teamRepository.teams.find((team) => team.team_id === teamData.team_id);

    console.log(existingTeam);

    if (!existingTeam) {
      return null;
    }

    const updatedTeams = [...teamRepository.updateTeam(teamData.team_id, teamData)];

    console.log(teamData);
    
    if (!updatedTeams) {
      return null;
    }

    for (let i = 0; i < updatedTeams.length; i++) {
      updatedTeams[i] = await this.enrichTeamData(updatedTeams[i]);
    }

    return updatedTeams
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