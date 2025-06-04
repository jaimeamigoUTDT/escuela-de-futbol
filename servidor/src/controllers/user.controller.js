const userService = require('../services/user.service');

async function authenticateUser(req, res, next) {
  try {
    // Log request body for debugging
    console.log('Request body:', req.body);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing or invalid' });
    }

    const { userData } = req.body;

    const dni = userData.dni;
    const password = userData.password;
    
    console.log('DNI:', dni);
    console.log('Password:', password);

    // Validate fields
    if (!dni || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Authenticate user
    const user = await userService.authenticateUser(dni, password);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.status(200).json({ message: 'Usuario autenticado exitosamente', data: user });
  } catch (error) {
    next(error); // Pass errors to error middleware
  }
}

async function createUser(req, res, next) {
  try {
    // Log request body for debugging
    console.log('Request body:', req.body);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing or invalid' });
    }

    const { userData } = req.body;

    console.log('User data:', userData);
  
    const name = userData.name;
    const dni = userData.dni;
    const password = userData.password;
    const email = userData.email;

    // Validate fields
    if (!name || !dni || !password || !email) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Create new user
    const newUser = await userService.createUser({ name, dni, email, password });

    if (!newUser) {
      return res.status(500).json({ message: 'Error al crear el usuario' });
    }

    return res.status(201).json({ message: 'Usuario creado exitosamente', data: newUser });
  } catch (error) {
    next(error); // Pass errors to error middleware
  }
}

module.exports = { createUser, authenticateUser };