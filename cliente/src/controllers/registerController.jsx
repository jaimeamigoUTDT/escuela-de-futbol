import authService from '../api/services/authService';

const registerController = {
    createUser: async (name, dni, email, password) => {
        try {
            console.log('Creando usuario:', {name, dni, email, password});
            
            const response = await authService.register({name, dni, email, password});

            console.log('Respuesta del servidor:', response.message);

            return {
                success: response.success,
                token: response.tokenData.authToken
            }
            
        } catch (error) {
            console.error('Creacion de usuario fallida:', error);
            return false;
        }
    },
};

export default registerController;