import authService from '../services/authService';

const registerController = {
    validateUser: async (name, dni, email, password) => {
        try {
            console.log('Creando usuario:', {name, dni, email, password});
            const response = await authService.register({name, dni, email, password});
            if (response.message == "Usuario creado exitosamente") {
                console.log("User created successfully:", response.data);
                return true;
            } else {
                console.error("Creacion de usuario fallida:", response.message);
                return false;
            }
        } catch (error) {
            console.error('Creacion de usuario fallida:', error);
            return false;
        }
    },
};

export default loginController;