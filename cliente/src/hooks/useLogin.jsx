// src/hooks/useLogin.js
import { useState } from 'react';
import loginController from '../controllers/loginController';
import { useAuth } from './useAuth';

const useLogin = () => {

  const {authToken, contextLogin} = useAuth();

  const login = async (dni, password) => {
    try {

      console.log(dni, password, authToken);

      const response = await loginController.validateUser(dni, password, authToken);

      console.log(response.success, response.userData);

      if (response.success) {
        contextLogin(response.userData);
      }
      
      return response.success;

    } catch (err) {
      throw err;
    }
  };

  return { login };
};

export default useLogin;
