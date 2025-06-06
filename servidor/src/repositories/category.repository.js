const fs = require("fs")
const path = require("path")
const { Category } = require("../models/category.model.js")

class categoryRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/categories.json")
    this.categories = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((c) => new Category(c.category_id, c.year, c.gender))
      }
    } catch (error) {
      console.error("Error loading categories data:", error)
    }

    // Default data if file doesn't exist or error occurs
    return [
      new Category(1, "2023", "Masculino"),
      new Category(2, "2023", "Femenino"),
      new Category(3, "2024", "Masculino"),
      new Category(4, "2024", "Femenino"),
      new Category(5, "2023", "Masculino"),
      new Category(6, "2023", "Femenino"),
    ]
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.categories, null, 2))
    } catch (error) {
      console.error("Error saving categories data:", error)
    }
  }

  getCategories() {
    return this.categories
  }
}

module.exports = new categoryRepository()
