// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MatchesProvider } from './context/MatchesContext';
import { CanchasProvider } from './context/CanchasContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <MatchesProvider>
      <CanchasProvider>
      <App />
      </CanchasProvider>
    </MatchesProvider>
  </AuthProvider>

);