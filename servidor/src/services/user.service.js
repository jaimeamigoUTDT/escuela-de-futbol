const userRepository = require('../repositories/user.repository');

class UserService {
    async createUser(name, dni, email, password) {
      // Business logic for creating user
      const user = await userRepository.addUser(name, dni, email, password);
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