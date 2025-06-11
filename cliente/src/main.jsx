// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MatchesProvider } from './context/MatchesContext';
import { PlayersProvider } from './context/PlayersContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <MatchesProvider>
      <PlayersProvider>
        <App />
      </PlayersProvider>
    </MatchesProvider>
  </AuthProvider>

);