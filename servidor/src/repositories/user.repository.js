const { v4: uuidv4 } = require('uuid');

const users = [
    {
        "name": "John Doe",
        "dni": "12345678",
        "email": "johnDoe@gmail.com",
        "password": "123456",
        "authToken": "12345678-1234-1234-1234-123456789012",
        "createdAt": "2023-10-01T12:00:00Z",
    }
];

class UserRepository {
    // Add a new user
    addUser(userData) {
        const user = { name: userData.name, dni: userData.dni, email: userData.email, password: userData.password };
        
        const existingUser = users.find(u => u.dni === user.dni);
        
        if (existingUser) {
            console.log('User already exists:', user.dni);
            return '';

        } else {
            const token = uuidv4();
            const tokenDate = user.createdAt = new Date().toISOString(); // Set the creation date

            user.authToken = token; // Assign a unique token to the user
            user.createdAt = tokenDate; // Set the creation date in the user object

            users.push(user);
            console.log('User added successfully:', user);
            return token; 
        }
    }

    // Find a user by ID
    findUserById(dni) {
        return users.find(user => user.dni === dni);
    }

    // Get all users
    getAllUsers() {
        return users;
    }

    // Update a user by ID
    updateUser(dni, updatedData) {
        const userIndex = users.findIndex(user => user.dni === dni);
        if (userIndex === -1) {
            return null;
        }
        users[userIndex] = { ...users[userIndex], ...updatedData };
        return users[userIndex];
    }

    // Delete a user by ID
    deleteUser(dni) {
        const userIndex = users.findIndex(user => user.dni === dni);
        if (userIndex === -1) {
            return null;
        }
        const deletedUser = users.splice(userIndex, 1);
        return deletedUser[0];
    }

    findUserByUsernameAndPassword (dni, password, authToken) {
        console.log('Finding user with DNI:', dni, ', password:', password, 'and authToken:', authToken);
    
        // Find user by DNI and password
        const user = users.find((u) => u.dni === dni && u.password === password);
    
        if (!user) {
          console.log('User not found or invalid credentials');
          return null;
        }
    
        // Check if authToken matches and is less than 1 day old
        const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const now = new Date();
        const tokenAge = user.tokenCreatedAt ? now - new Date(user.tokenCreatedAt) : Infinity;
    
        if (user.authToken === authToken && tokenAge < oneDayInMs) {
          console.log('Token is valid and recent');
          return user.authToken; // Return user with existing token
        }
    
        // Generate new token if authToken is missing, different, or older than 1 day
        const newToken = uuidv4();
        user.authToken = newToken;
        user.tokenCreatedAt = now;
        console.log('Generated new token:', newToken);
    
        return user.authToken; // Return user with new token
      }
}

module.exports = new UserRepository();