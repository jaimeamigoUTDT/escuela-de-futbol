const userService = require('../services/user.service');

class LoginController {
  async authenticateUser(req, res, next) {
    try {
      console.log('Request body:', req.body);

      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: 'Request body is missing or invalid',
          userData: {}
        });
      }

      const { userData } = req.body;

      if (!userData || !userData.dni || !userData.password) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios',
          userData: {}
        });
      }

      const { dni, password, authToken } = userData;

      console.log('DNI:', dni);
      console.log('Password:', password);
      console.log('Auth Token:', authToken);

      const user = await userService.authenticateUser(dni, password, authToken);

      if (!user.authToken) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas',
          userData: {}
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Usuario autenticado exitosamente',
        userData: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        userData: {}
      });
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      console.log('Request body:', req.body);

      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: 'Request body is missing or invalid',
          token: {},
        });
      }

      const { userData } = req.body;

      if (!userData || !userData.name || !userData.dni || !userData.password || !userData.email) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios',
          token: {},
        });
      }

      const { name, dni, email, password } = userData;

      const newUserToken = await userService.createUser({ name, dni, email, password });

      if (newUserToken === '') {
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
      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        token: {},
      });
      next(error);
    }
  }
}

module.exports = new LoginController();