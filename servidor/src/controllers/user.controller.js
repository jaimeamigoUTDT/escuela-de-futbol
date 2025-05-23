const userService = require('../services/user.service');

async function createUser(req, res, next) {
  try {
    // Log request body for debugging
    console.log('Request body:', req.body);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing or invalid' });
    }

    const { username, password, email } = req.body;

    // Validate fields
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Create new user
    const newUser = await userService.createUser({ username, password, email });

    if (!newUser) {
      return res.status(500).json({ message: 'Error al crear el usuario' });
    }

    return res.status(201).json({ message: 'Usuario creado exitosamente', data: newUser });
  } catch (error) {
    next(error); // Pass errors to error middleware
  }
}

module.exports = { createUser };