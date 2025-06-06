const fs = require("fs")
const path = require("path")
const { Match } = require("../models/match.model")

class matchRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/matches.json")
    this.matches = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((m) => new Match(m))
      }
    } catch (error) {
      console.error("Error loading matches data:", error)
    }
    return []
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.matches, null, 2))
    } catch (error) {
      console.error("Error saving matches data:", error)
    }
  }

  resolveReferences(match) {
    // Import repositories here to avoid circular dependencies
    const categoryRepository = require("./category.repository")
    const canchaRepository = require("./cancha.repository")
    const teamRepository = require("./team.repository")

    const resolvedMatch = { ...match }

    // Resolve category_id to category object
    if (match.category_id) {
      const category = categoryRepository.getCategories().find((c) => c.category_id === match.category_id)
      resolvedMatch.category = category || null
    }

    // Resolve cancha_id to cancha object
    if (match.cancha_id) {
      const cancha = canchaRepository.getCanchas().find((c) => c.cancha_id === match.cancha_id)
      resolvedMatch.cancha = cancha || null
    }

    // Resolve local_team_id to team object
    if (match.local_team_id) {
      const localTeam = teamRepository.getTeams().find((t) => t.team_id === match.local_team_id)
      resolvedMatch.local_team = localTeam || null
    }

    // Resolve rival_team_id to team object
    if (match.rival_team_id) {
      const rivalTeam = teamRepository.getTeams().find((t) => t.team_id === match.rival_team_id)
      resolvedMatch.rival_team = rivalTeam || null
    }

    return resolvedMatch
  }

  createMatch(matchData) {
    this.matches.push(new Match(matchData))
    this.saveData()
    console.log(this.matches)
    return matchData
  }

  getMatches() {
    return this.matches.map((match) => this.resolveReferences(match))
  }

  getMatchById(match_id) {
    const match = this.matches.find((m) => m.match_id === match_id)
    return match ? this.resolveReferences(match) : null
  }

  updateMatch(match_id, matchData) {
    this.deleteMatch(match_id)
    this.createMatch(matchData)
    return matchData
  }

  deleteMatch(match_id) {
    const matchIndex = this.matches.findIndex((match) => match.match_id === match_id)

    if (matchIndex !== -1) {
      const deleted = this.matches.splice(matchIndex, 1)[0]
      this.saveData()
      return deleted
    }
    return null
  }
}

module.exports = new matchRepository()
