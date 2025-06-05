// src/hooks/useLogin.js
import { useState } from 'react';
import loginController from '../controllers/loginController';
import { useAuth } from '../context/AuthContext';

const useLogin = () => {

  const [error, setError] = useState(null);
  const {authToken, contextLogin} = useAuth();

  const login = async (dni, password) => {
    setError(null);
    try {

      const response = await loginController.validateUser(dni, password, authToken);

      if (response.success) {
        if (authToken !== response.token) {
          contextLogin(response.token);
        }
        return true; 
      }
      return false; // Handle success (e.g., redirect or store token)

    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  return { login, error };
};

export default useLogin;
