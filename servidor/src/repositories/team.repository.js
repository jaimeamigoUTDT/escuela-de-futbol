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

  createTeam(teamData) {

    const updatedTeam = {
      team_id: teamData.team_id,
      name: teamData.name,
      match_id: teamData.match_id,
      category_id: teamData.category_id,
      players_ids: teamData.players_ids,
      confirmed_players_ids: teamData.confirmed_players_ids,
    }

    this.teams.push(updatedTeam)
    this.saveData()
    return updatedTeam
  }

  getTeams() {

    return this.teams
  }

  getTeamById(team_id) {
    const team = this.teams.find((t) => t.team_id === team_id)
    return team
  }

  updateTeam(team_id, teamData) {
    
    this.deleteTeam(team_id)
    
    const updatedTeam = {
      team_id: teamData.team_id,
      name: teamData.name,
      match_id: teamData.match_id,
      category_id: teamData.category_id,
      players_ids: teamData.players_ids,
      confirmed_players_ids: teamData.confirmed_players_ids,
    }
    
    this.createTeam(updatedTeam)

    this.saveData()

    return this.teams
  }

  deleteTeam(team_id) {
    const teamIndex = this.teams.findIndex((team) => team.team_id === team_id)

    console.log("Deleting team with ID:", team_id)

    if (teamIndex !== -1) {
      const deleted = this.teams.splice(teamIndex, 1)[0]
      this.saveData()
      return deleted
    }
    
    return null
  }
}

module.exports = new teamRepository()
