import authService from '../services/authService';

const loginController = {
    validateUser: async (dni, password) => {
        try {
            console.log('Validating user:', { dni, password });
            const response = await authService.login({dni, password});
            if (response.message == "Usuario autenticado exitosamente") {
                console.log("User validated successfully:", response.data);
                return true;
            } else {
                console.error("User validation failed:", response.message);
                return false;
            }
        } catch (error) {
            console.error('Error validating user:', error);
            return false;
        }
    },
};

export default loginController;