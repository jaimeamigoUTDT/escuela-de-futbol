const userService = require("../services/user.service")

class LoginController {
  async authenticateUser(req, res, next) {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Request body is missing or invalid",
          userData: {},
        })
      }

      // Handle both direct userData and nested userData
      let userData
      if (req.body.userData) {
        userData = req.body.userData
      } else {
        userData = req.body
      }

      console.log("Received request body:", req.body)
      console.log("Extracted userData:", userData)

      if (!userData || !userData.dni || !userData.password) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios (DNI y password)",
          userData: {},
        })
      }

      const { dni, password, authToken } = userData

      console.log("DNI:", dni)
      console.log("Password:", password)
      console.log("Auth Token:", authToken)

      const user = await userService.authenticateUser(dni, password, authToken)

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
          userData: {},
        })
      }

      // Return user data with token
      return res.status(200).json({
        success: true,
        message: "Usuario autenticado exitosamente",
        userData: user,
        token: user.authToken || user.token, // Include token in response
        user: {
          dni: user.dni,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    } catch (error) {
      console.error("Authentication error:", error)
      res.status(500).json({
        success: false,
        message: error.message || "Error interno del servidor",
        userData: {},
      })
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Request body is missing or invalid",
          tokenData: {},
        })
      }

      // Handle both direct userData and nested userData
      let userData
      if (req.body.userData) {
        userData = req.body.userData
      } else {
        userData = req.body
      }

      console.log("Received registration data:", userData)

      if (!userData || !userData.name || !userData.dni || !userData.password || !userData.email) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios (name, dni, email, password)",
          tokenData: {},
        })
      }

      const { name, dni, email, password } = userData

      const newUserTokenData = await userService.createUser({ name, dni, email, password })

      console.log("New User Token Data:", newUserTokenData)

      if (!newUserTokenData || !newUserTokenData.authToken) {
        return res.status(500).json({
          success: false,
          message: "Error al crear el usuario",
          tokenData: {},
        })
      }

      return res.status(201).json({
        success: true,
        message: "Usuario creado exitosamente",
        tokenData: newUserTokenData,
        user: {
          dni: newUserTokenData.dni,
          name: newUserTokenData.name,
          email: newUserTokenData.email,
          role: newUserTokenData.role,
        },
      })
    } catch (error) {
      console.error("User creation error:", error)
      res.status(500).json({
        success: false,
        message: error.message || "Error interno del servidor",
        tokenData: {},
      })
      next(error)
    }
  }

  async updateUserRole(req, res, next) {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Request body is missing or invalid",
          userData: {},
        })
      }

      // Extract data directly from req.body or from nested structure
      const { userId, newRole, authToken, dni } = req.body

      console.log("Update role request:", { userId, newRole, authToken, dni })

      if (!userId || !newRole) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios (userId, newRole)",
          userData: {},
        })
      }

      const updatedUser = await userService.updateUserRole(userId, newRole)

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
          userData: {},
        })
      }

      return res.status(200).json({
        success: true,
        message: "Rol de usuario actualizado exitosamente",
        userData: updatedUser,
      })
    } catch (error) {
      console.error("Update user role error:", error)
      res.status(500).json({
        success: false,
        message: error.message || "Error interno del servidor",
        userData: {},
      })
      next(error)
    }
  }

  // Add a method to validate auth token
  async validateToken(req, res, next) {
    try {
      const { authToken, dni } = req.body

      if (!authToken || !dni) {
        return res.status(400).json({
          success: false,
          message: "Token y DNI son requeridos",
          userData: {},
        })
      }

      const user = await userService.validateAuthToken(authToken, dni)

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token inválido o expirado",
          userData: {},
        })
      }

      return res.status(200).json({
        success: true,
        message: "Token válido",
        userData: user,
      })
    } catch (error) {
      console.error("Token validation error:", error)
      res.status(500).json({
        success: false,
        message: error.message || "Error interno del servidor",
        userData: {},
      })
      next(error)
    }
  }
}

module.exports = new LoginController()
