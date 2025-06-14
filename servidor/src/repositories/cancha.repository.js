const fs = require("fs")
const path = require("path")
const { Cancha } = require("../models/cancha.model.js")

class canchaRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/canchas.json")
    this.canchas = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map(
          (c) => new Cancha(c.cancha_id, c.direccion, c.jugadores, c.tipo_cesped, c.techada, c.iluminacion),
        )
      }
    } catch (error) {
      console.error("Error loading canchas data:", error)
    }

    // Default data if file doesn't exist or error occurs
    return []
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.canchas, null, 2))
    } catch (error) {
      console.error("Error saving canchas data:", error)
    }
  }

  getCanchas() {
    return this.canchas
  }

  getCanchaById(cancha_id) {
    return this.canchas.find((c) => c.cancha_id === cancha_id)
  }
}

module.exports = new canchaRepository()
