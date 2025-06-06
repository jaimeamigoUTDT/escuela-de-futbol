const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

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
    return [
      {
        name: "John Doe",
        dni: "12345678",
        email: "johnDoe@gmail.com",
        password: "123456",
        authToken: "12345678-1234-1234-1234-123456789012",
        createdAt: "2023-10-01T12:00:00Z",
      },
    ]
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
    const user = { name: userData.name, dni: userData.dni, email: userData.email, password: userData.password }

    const existingUser = this.users.find((u) => u.dni === user.dni)

    if (existingUser) {
      console.log("User already exists:", user.dni)
      return ""
    } else {
      const token = uuidv4()
      const tokenDate = (user.createdAt = new Date().toISOString())

      user.authToken = token
      user.createdAt = tokenDate

      this.users.push(user)
      this.saveData()
      console.log("User added successfully:", user)
      return token
    }
  }

  findUserById(dni) {
    return this.users.find((user) => user.dni === dni)
  }

  getAllUsers() {
    return this.users
  }

  updateUser(dni, updatedData) {
    const userIndex = this.users.findIndex((user) => user.dni === dni)
    if (userIndex === -1) {
      return null
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updatedData }
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

    const oneDayInMs = 24 * 60 * 60 * 1000
    const now = new Date()
    const tokenAge = user.tokenCreatedAt ? now - new Date(user.tokenCreatedAt) : Number.POSITIVE_INFINITY

    if (user.authToken === authToken && tokenAge < oneDayInMs) {
      console.log("Token is valid and recent")
      return user.authToken
    }

    const newToken = uuidv4()
    user.authToken = newToken
    user.tokenCreatedAt = now
    this.saveData()
    console.log("Generated new token:", newToken)

    return user.authToken
  }
}

module.exports = new UserRepository()
