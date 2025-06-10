// src/hooks/useRegister.jsx
import { useState } from 'react';
import { useAuth } from "./useAuth"
import registerController from '../controllers/registerController';

const useRegister = () => {
  const [error, setError] = useState(null);
  const {contextLogin } = useAuth();

  const register = async (name, dni, email, password) => {
    
    setError(null);
    
    try {
      const response = await registerController.createUser(name, dni, email, password);

      if (response.success) {
        // Store authToken if provided in response.data.token
        contextLogin(response.data.token);
        return true; // Return response for further handling if needed

      } else {
        setError('Registration failed');
        return false;
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      return false;
    }
  };

  return { register, error };
};

export default useRegister;