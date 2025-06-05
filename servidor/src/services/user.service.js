const userRepository = require('../repositories/user.repository');

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
      return user;
    }
  }

module.exports = new UserService();