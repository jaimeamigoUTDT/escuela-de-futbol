// src/hooks/useLogin.js
import { useState } from 'react';
import loginController from '../controllers/loginController';

const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (dni, password) => {
    setError(null);
    try {
      const response = await loginController.validateUser(dni, password);
      return response; // Handle success (e.g., redirect or store token)
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  return { login, error };
};

export default useLogin;