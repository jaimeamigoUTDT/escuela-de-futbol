import authService from '../api/services/authService';

const loginController =  { 

    validateUser: async (dni, password, authToken) => {
        try {
            console.log('Validating user:', { dni, password, authToken});
            
            const response = await authService.login({ dni, password, authToken});

            return response;

        } catch (error) {
            console.error('Error validating user:', error);
            return {};
        }
    },
};

export default loginController;