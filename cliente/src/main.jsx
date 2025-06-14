import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MatchesProvider } from './context/MatchesContext';
import { PlayersProvider } from './context/PlayersContext';
import { CanchasProvider } from './context/CanchasContext';
import { TeamsProvider } from './context/TeamsContext';
import { ResultsProvider } from './context/ResultsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <TeamsProvider>
      <MatchesProvider>
        <CanchasProvider>
          <PlayersProvider>
            <ResultsProvider>
              <App />
            </ResultsProvider>
          </PlayersProvider>
        </CanchasProvider>
      </MatchesProvider>
      </TeamsProvider>
  </AuthProvider>

);