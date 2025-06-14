import authService from '../api/services/authService';

export const userController = () => {
    
    const updateUserRole = async (userId, newRole) => {
        try {
            console.log('Updating user role:', { userId, newRole });
            
            const response = await authService.updateUserRole(userId, newRole);
            
            return response;
        } catch (error) {
            console.error('Error updating user role:', error);
            return {};
        }
    }
    
    
    return {updateUserRole}
}