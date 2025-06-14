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

  createMatch(matchData) {
    this.matches.push(new Match(matchData))
    this.saveData()
    console.log(this.matches)
    return matchData
  }

  getMatches() {
    return this.matches
  }

  getMatchById(match_id) {
    const match = this.matches.find((m) => m.match_id === match_id)
    return match
  }

  updateMatch(match_id, matchData) {
    this.deleteMatch(match_id)
    this.createMatch(matchData)

    console.log("matchData in repo: ", matchData)
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
