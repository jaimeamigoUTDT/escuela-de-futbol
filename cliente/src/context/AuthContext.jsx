import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userDni, setUserDni] = useState(localStorage.getItem('userDni') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem('authToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const contextLogin = (user) => {
    saveToken(user.authToken);
    saveUserInfo(user);
  };

  const saveToken = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const saveUserInfo = (user) => {
    localStorage.setItem('userName', user.name || '');
    localStorage.setItem('userDni', user.dni || '');
    localStorage.setItem('userEmail', user.email || '');
    localStorage.setItem('userRole', user.role || '');
    setUserName(user.name || '');
    setUserDni(user.dni || '');
    setUserEmail(user.email || '');
    setUserRole(user.role || '');
  };

  const contextLogout = () => {
    deleteToken();
    deleteUserInfo();
    window.location.reload();
  };

  const deleteToken = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  const deleteUserInfo = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userDni');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUserName('');
    setUserDni('');
    setUserEmail('');
    setUserRole('');
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userName,
        userDni,
        userEmail,
        userRole,
        contextLogin,
        contextLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};