const fs = require("fs")
const path = require("path")
const { Result } = require("../models/result.model")

class resultRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/results.json")
    this.results = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((r) => new Result(r))
      }
    } catch (error) {
      console.error("Error loading results data:", error)
    }
    return []
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.results, null, 2))
    } catch (error) {
      console.error("Error saving results data:", error)
    }
  }

  createResult(resultData) {
    this.results.push(new Result(resultData))
    this.saveData()
    console.log(this.results)
    return resultData
  }

  getResults() {
    this.results = this.loadData()
    return this.results
  }

  getResultById(result_id) {
    const result = this.results.find((r) => r.result_id === result_id)
    return result
  }

  updateResult(result_id, resultData) {
    this.deleteResult(result_id)
    this.createResult(resultData)

    console.log("resultData in repo: ", resultData)
  }

  deleteResult(result_id) {
    const resultIndex = this.results.findIndex((result) => result.result_id === result_id)

    if (resultIndex !== -1) {
      const deleted = this.results.splice(resultIndex, 1)[0]
      this.saveData()
      return deleted
    }
    return null
  }
}

module.exports = new resultRepository()
