import { useAuth } from "../hooks/useAuth";
 
const logoutController = () => {

    const {contextLogout} = useAuth();

    const logoutUser = async () => {
        
        contextLogout();

    };

    return {
        logoutUser
    }
};

export default logoutController;