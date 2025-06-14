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

  createPlayer(playerData) {
    // Check if the player already exists
    const existingPlayer = this.players.find((p) => p.dni === playerData.dni);

    if (!existingPlayer) {
      this.players.push(new Player(playerData))
      this.saveData()
      console.log(this.players)
      return playerData
    }

    return existingPlayer; // Return existing player if already exists
  }

  getPlayers() {
    return this.players
  }

  getPlayerByDni(dni) {
    // Convert dni to number or string to match p.dni type
    const player = this.players.find((p) => p.dni === Number(dni)); // If p.dni is a number
    
    return player;
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
