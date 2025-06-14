const userService = require('../services/user.service');

class LoginController {
  async authenticateUser(req, res, next) {
    try {
      
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

      if (!user) {
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
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: 'Request body is missing or invalid',
          tokenData: {},
        });
      }

      const { userData } = req.body;

      if (!userData || !userData.name || !userData.dni || !userData.password || !userData.email) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios',
          tokenData: {},
        });
      }

      const { name, dni, email, password } = userData;

      const newUserTokenData = await userService.createUser({ name, dni, email, password });

      console.log('New User Token Data:', newUserTokenData);

      if (Object.keys(newUserTokenData.authToken).length === 0) {
        return res.status(500).json({
          success: false,
          message: 'Error al crear el usuario',
          tokenData: {},
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        tokenData: newUserTokenData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        tokenData: {},
      });
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: 'Request body is missing or invalid',
          userData: {},
        });
      }

      const { userId, newRole } = req.body;

      if (!userId || !newRole) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios',
          userData: {},
        });
      }

      const updatedUser = await userService.updateUserRole(userId, newRole);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
          userData: {},
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Rol de usuario actualizado exitosamente',
        userData: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        userData: {},
      });
      next(error);
    }
  }
}

module.exports = new LoginController();