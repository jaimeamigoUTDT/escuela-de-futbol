const fs = require("fs")
const path = require("path")
const { Team } = require("../models/team.model")

class teamRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/teams.json")
    this.teams = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((t) => new Team(t))
      }
    } catch (error) {
      console.error("Error loading teams data:", error)
    }
    return []
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.teams, null, 2))
    } catch (error) {
      console.error("Error saving teams data:", error)
    }
  }

  resolveReferences(team) {
    // Import repositories here to avoid circular dependencies
    const categoryRepository = require("./category.repository")
    const playerRepository = require("./player.repository")

    const resolvedTeam = { ...team }

    // Resolve category_id to category object
    if (team.category_id) {
      const category = categoryRepository.getCategories().find((c) => c.category_id === team.category_id)
      resolvedTeam.category = category || null
    }

    // Resolve players array (if team has player IDs)
    if (team.player_ids && Array.isArray(team.player_ids)) {
      const allPlayers = playerRepository.players // Get raw players to avoid circular reference
      resolvedTeam.players = team.player_ids
        .map((playerId) => allPlayers.find((p) => p.dni === playerId))
        .filter(Boolean) // Remove null/undefined values
    }

    return resolvedTeam
  }

  createTeam(teamData) {
    this.teams.push(new Team(teamData))
    this.saveData()
    console.log(this.teams)
    return teamData
  }

  getTeams() {
    return this.teams.map((team) => this.resolveReferences(team))
  }

  getTeamById(team_id) {
    const team = this.teams.find((t) => t.team_id === team_id)
    return team ? this.resolveReferences(team) : null
  }

  updateTeam(team_id, teamData) {
    this.deleteTeam(team_id)
    this.createTeam(teamData)
    return teamData
  }

  deleteTeam(team_id) {
    const teamIndex = this.teams.findIndex((team) => team.team_id === team_id)

    if (teamIndex !== -1) {
      const deleted = this.teams.splice(teamIndex, 1)[0]
      this.saveData()
      return deleted
    }
    return null
  }
}

module.exports = new teamRepository()
