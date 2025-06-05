// backend/controllers/userController.js
const userService = require('../services/user.service');

async function authenticateUser(req, res, next) {
  try {
    // Log request body for debugging
    console.log('Request body:', req.body);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is missing or invalid',
        token: {},
      });
    }

    const { userData } = req.body;

    // Validate userData
    if (!userData || !userData.dni || !userData.password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
        token: {},
      });
    }

    const { dni, password, authToken } = userData;

    console.log('DNI:', dni);
    console.log('Password:', password);
    console.log('Auth Token:', authToken);

    // Authenticate user
    const userToken = await userService.authenticateUser(dni, password, authToken);

    if (!userToken) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        token: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Usuario autenticado exitosamente',
      token: userToken,
    });

  } catch (error) {
    // Pass errors to error middleware, but format the response
    res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      token: {},
    });
    next(error); // Still pass to error middleware for logging or other purposes
  }
}

async function createUser(req, res, next) {
  try {
    // Log request body for debugging
    console.log('Request body:', req.body);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is missing or invalid',
        token: {},
      });
    }

    const { userData } = req.body;

    // Validate userData
    if (!userData || !userData.name || !userData.dni || !userData.password || !userData.email) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
        token: {},
      });
    }

    const { name, dni, email, password } = userData;

    // Create new user
    const newUserToken = await userService.createUser({ name, dni, email, password });

    if (newUserToken == '') {
      return res.status(500).json({
        success: false,
        message: 'Error al crear el usuario',
        token: {},
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      token: newUserToken,
    });
    
  } catch (error) {
    // Pass errors to error middleware, but format the response
    res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      token: {},
    });
    next(error); // Still pass to error middleware for logging or other purposes
  }
}

module.exports = { createUser, authenticateUser };