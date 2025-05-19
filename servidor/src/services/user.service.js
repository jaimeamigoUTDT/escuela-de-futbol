class UserService {
    createUser(userData) {
      // Business logic for creating user
      return { message: 'User created', data: userData };
    }
  }
  
export default new UserService();