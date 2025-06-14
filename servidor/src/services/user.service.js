const userRepository = require('../repositories/user.repository');
const { v4: uuidv4 } = require('uuid');

class UserService {
  async createUser(userData) {
    try {
      // Validate userData
      if (!userData.dni || !userData.password) {
        throw new Error('DNI and password are required');
      }

      const newToken = uuidv4();

      const newUser = {
        ...userData,
        id: new Date(), // Unique user ID
        createdAt: new Date().toISOString(), // Creation timestamp
        authToken: newToken, // Initial auth token
        tokenCreatedAt: new Date().toISOString(),
      };

      // Add user to repository
      const repositoryResponse = userRepository.addUser(newUser);

      console.log(repositoryResponse)

      if (!repositoryResponse) {
        throw new Error('Failed to create user in repository');
      }

      return { authToken: newUser.authToken, tokenCreatedAt: newUser.tokenCreatedAt };

    } catch (error) {

      console.error('Error creating user:', error.message);
      return { authToken: {}, tokenCreatedAt: {} };
    }
  }

  async authenticateUser(dni, password, authToken) {
    try {
      // Find user by credentials
      const user = await userRepository.findUserByUsernameAndPassword(dni, password, authToken);

      if (!user) {
        return null;
      }

      const oneDayInMs = 24 * 60 * 60 * 1000;
      const now = new Date();
      const tokenAge = user.tokenCreatedAt ? now - new Date(user.tokenCreatedAt) : Number.POSITIVE_INFINITY;

      if (!authToken || tokenAge > oneDayInMs) {
        console.log('No valid auth token provided, generating a new one');
        const newToken = uuidv4();
        user.authToken = newToken;
        user.tokenCreatedAt = now.toISOString();

        // Update user in repository
        await userRepository.updateUser(user);

        console.log('Generated new token:', newToken);
        return user;
      }

      return user;
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      return null;
    }
  }

  async updateUserRole(userId, newRole) {
    try {
      // Validate inputs
      if (!userId || !newRole) {
        throw new Error('User ID and new role are required');
      }

      // Update user role in repository
      const updatedUser = await userRepository.updateUserRole(userId, newRole);

      if (!updatedUser) {
        throw new Error('Failed to update user role');
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating user role:', error.message);
      throw error; // Re-throw the error for further handling
    }
  }
}

module.exports = new UserService();