import React, { createContext, useState, useContext } from 'react';

export const CanchasContext = createContext();

export const CanchasProvider = ({ children }) => {
  const [canchas, setCanchas] = useState([]);

  const saveCanchas = (newCanchas) => {
    setCanchas(Array.isArray(newCanchas) ? newCanchas : [newCanchas]);
  };

  const getStoredCanchas = () => {
    return canchas
  };

  return (
    <CanchasContext.Provider value={{ canchas, saveCanchas, getStoredCanchas }}>
      {children}
    </CanchasContext.Provider>
  );
};

export const useCanchas = () => {
  const context = useContext(CanchasContext);
  if (!context) {
    throw new Error('useCanchas must be used within a CanchasProvider');
  }
  return context;
};