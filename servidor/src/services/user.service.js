const userRepository = require('../repositories/user.repository');
const { v4: uuidv4 } = require("uuid")

class UserService {
    async createUser(userData) {
      // Business logic for creating user
      const repositoryResponse = userRepository.addUser(userData);

      return repositoryResponse;
    }

    async authenticateUser(dni, password, authToken) {
      // Business logic for authenticating user
      const user = userRepository.findUserByUsernameAndPassword(dni, password, authToken);

      if (!user) {
        return null;
      }

      const oneDayInMs = 24 * 60 * 60 * 1000
      const now = new Date()
      const tokenAge = user.tokenCreatedAt ? now - new Date(user.tokenCreatedAt) : Number.POSITIVE_INFINITY

      if (!authToken || tokenAge > oneDayInMs ) {
        console.log("No auth token provided, generating a new one")
        const newToken = uuidv4()
        user.authToken = newToken
        user.tokenCreatedAt = now
        this.saveData()
        console.log("Generated new token:", newToken)

        userRepository.updateUser(user) // Assuming this method saves the updated user data

        console.log("Generated new token:", newToken)
        return user
      } else {
        return user;
      }
    }
  }

module.exports = new UserService();