const users = [
    {
        "name": "John Doe",
        "dni": "12345678",
        "email": "johnDoe@gmail.com",
        "password": "123456"
    }
];

class UserRepository {
    // Add a new user
    addUser(name, dni, email, password) {
        const user = { name, dni, email, password }
        users.push(user);
        return user;
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

    // Find a user by username and password
    findUserByUsernameAndPassword(dni, password) {
        console.log('Finding user with DNI:', dni, 'and password:', password);
        
        return users.find(user => user.dni === dni && user.password === password);
    }
}

module.exports = new UserRepository();