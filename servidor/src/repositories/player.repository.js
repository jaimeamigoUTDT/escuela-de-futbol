const fs = require("fs")
const path = require("path")
const { Player } = require("../models/player.model")

class playerRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/players.json")
    this.players = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((p) => new Player(p))
      }
    } catch (error) {
      console.error("Error loading players data:", error)
    }
    return []
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.players, null, 2))
    } catch (error) {
      console.error("Error saving players data:", error)
    }
  }

  resolveReferences(player) {
    // Import repositories here to avoid circular dependencies
    const categoryRepository = require("./category.repository")
    const teamRepository = require("./team.repository")
    const userRepository = require("./user.repository")

    const resolvedPlayer = { ...player }

    // Resolve category_id to category object
    if (player.category_id) {
      const category = categoryRepository.getCategories().find((c) => c.category_id === player.category_id)
      resolvedPlayer.category = category || null
    }

    // Resolve team_id to team object
    if (player.team_id) {
      const team = teamRepository.getTeams().find((t) => t.team_id === player.team_id)
      resolvedPlayer.team = team || null
    }

    // Resolve parent_dni to parent user object
    if (player.parent_dni) {
      // Convert to string to match user repository format
      const parentDniStr = String(player.parent_dni)
      const parent = userRepository.findUserById(parentDniStr)

      // Debug logging
      console.log(`Looking for parent with DNI: ${parentDniStr}`)
      console.log(`Found parent:`, parent)

      resolvedPlayer.parent = parent || null
    }

    return resolvedPlayer
  }

  createPlayer(playerData) {
    this.players.push(new Player(playerData))
    this.saveData()
    console.log(this.players)
    return playerData
  }

  getPlayers() {
    return this.players.map((player) => this.resolveReferences(player))
  }

  getPlayerByDni(dni) {
    const player = this.players.find((p) => p.dni === dni)

    console.log(`Searching for player with DNI: ${dni}`)
    console.log(`Found player:`, player)

    return player
  }

  updatePlayer(dni, playerData) {
    this.deletePlayer(dni)
    this.createPlayer(playerData)
    return playerData
  }

  deletePlayer(dni) {
    const playerIndex = this.players.findIndex((player) => player.dni === dni)

    if (playerIndex !== -1) {
      const deleted = this.players.splice(playerIndex, 1)[0]
      this.saveData()
      return deleted
    }
    return null
  }
}

module.exports = new playerRepository()
