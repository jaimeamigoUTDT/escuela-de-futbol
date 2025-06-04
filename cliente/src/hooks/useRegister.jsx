// src/hooks/useLogin.js
import { useState } from 'react';
import registerController from '../controllers/registerController';

const useRegister = () => {
    const [error, setError] = useState(null);

    const register = async (name, dni, email, password) => {
        setError(null);
        try {
            const response = await registerController.createUser(name, dni, email, password);
            return response; // Handle success (e.g., redirect or store token)
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        }
    };

    return { register, error };
};

export default useRegister;