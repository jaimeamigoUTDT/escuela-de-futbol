import authService from '../api/services/authService';

const loginController = {
    validateUser: async (dni, password, authToken) => {
        try {
            console.log('Validating user:', { dni, password, authToken});
            const response = await authService.login({ dni, password, authToken});

            console.log('Response from server:', response.message);

            return {
                success: response.success,
                token: response.token,
            }

        } catch (error) {
            console.error('Error validating user:', error);
            return false;
        }
    },
};

export default loginController;