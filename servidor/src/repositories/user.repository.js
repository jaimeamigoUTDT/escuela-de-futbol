const fs = require("fs")
const path = require("path")

class UserRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/users.json")
    this.users = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        return JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
      }
    } catch (error) {
      console.error("Error loading users data:", error)
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
      fs.writeFileSync(this.dataFile, JSON.stringify(this.users, null, 2))
    } catch (error) {
      console.error("Error saving users data:", error)
    }
  }

  addUser(userData) {
    const user = { 
      name: userData.name, 
      dni: userData.dni, 
      email: userData.email, 
      password: userData.password,
      createdAt: userData.createdAt,
      authToken: userData.authToken,
      tokenCreatedAt: userData.tokenCreatedAt,
      role: "parent",
      }
    const existingUser = this.users.find((u) => u.dni === user.dni)

    if (existingUser) {
      console.log("User already exists:", user.dni)
      return ""

    } else {

      this.users.push(user)

      this.saveData()

      console.log("User added successfully:", user)
      return true
    }
  }

  getAllUsers() {
    return this.users
  }

  updateUser(user) {
    const userIndex = this.users.findIndex((matchingUser) => matchingUser.dni === user.dni)
    if (userIndex === -1) {
      return null
    }
    this.users[userIndex] = { ...this.users[userIndex], ...user }
    this.saveData()
    return this.users[userIndex]
  }

  deleteUser(dni) {
    const userIndex = this.users.findIndex((user) => user.dni === dni)
    if (userIndex === -1) {
      return null
    }
    const deletedUser = this.users.splice(userIndex, 1)
    this.saveData()
    return deletedUser[0]
  }

  findUserByUsernameAndPassword(dni, password, authToken) {
    console.log("Finding user with DNI:", dni, ", password:", password, "and authToken:", authToken)

    const user = this.users.find((u) => u.dni === dni && u.password === password)

    if (!user) {
      console.log("User not found or invalid credentials")
      return null
    }

    return user
  }

  getUserById(dni) {

    const user = this.users.find((user) => Number(user.dni) === dni)

    if (!user) {
      console.log("User not found with DNI:", dni)
      return null
    }

    return { ...user }
  }
}

module.exports = new UserRepository()
