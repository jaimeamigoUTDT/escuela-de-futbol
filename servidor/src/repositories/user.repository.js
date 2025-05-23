const users = [];

class UserRepository {
    // Add a new user
    addUser(user) {
        users.push(user);
        return user;
    }

    // Find a user by ID
    findUserById(id) {
        return users.find(user => user.id === id);
    }

    // Get all users
    getAllUsers() {
        return users;
    }

    // Update a user by ID
    updateUser(id, updatedData) {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        users[userIndex] = { ...users[userIndex], ...updatedData };
        return users[userIndex];
    }

    // Delete a user by ID
    deleteUser(id) {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        const deletedUser = users.splice(userIndex, 1);
        return deletedUser[0];
    }
}

module.exports = new UserRepository();