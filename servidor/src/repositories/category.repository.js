const fs = require("fs")
const path = require("path")
const { Category } = require("../models/category.model")

class categoryRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/categories.json")
    this.categories = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((m) => new Category(m))
      }
    } catch (error) {
      console.error("Error loading categories data:", error)
    }
    return []
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

  createCategory(categoryData) {
    this.categories.push(new Category(categoryData))
    this.saveData()
    console.log(this.categories)
    return categoryData
  }

  getCategories() {
    return this.categories
  }

  getCategoryById(category_id) {
    const category = this.categories.find((c) => c.category_id === category_id)
    return category
  }

  getCategoryByGenderYear(gender, year) {
    const category = this.categories.find((c) => c.gender === gender && c.year === year);
    return category
  }

  updateCategory(category_id, categoryData) {
    this.deleteCategory(category_id)
    this.createCategory(categoryData)

    console.log("categoryData in repo: ", categoryData)
  }

  deleteCategory(category_id) {
    const categoryIndex = this.categories.findIndex((category) => category.category_id === category_id)

    if (categoryIndex !== -1) {
      const deleted = this.categories.splice(categoryIndex, 1)[0]
      this.saveData()
      return deleted
    }
    return null
  }
}

module.exports = new categoryRepository()