const userRepository = require('../repositories/user.repository');

class UserService {
    async createUser(userData) {
      // Business logic for creating user
      const user = await userRepository.addUser(userData);
      if (!user) {
        return null;
      }
      return user;
    }

    async authenticateUser(dni, password) {
      // Business logic for authenticating user
      const user = await userRepository.findUserByUsernameAndPassword(dni, password);
      if (!user) {
        return null;
      }
      return user;
    }
  }

module.exports = new UserService();