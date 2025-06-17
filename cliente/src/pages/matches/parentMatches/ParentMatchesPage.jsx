import React, { useState, useEffect } from 'react';
import { matchesController } from "../../../controllers/matchesController";
import { teamsController } from "../../../controllers/teamsController";
import Navbar from '../../../components/layout/Navbar';
import MatchCard from '../../../components/common/MatchCard';
import './ParentMatchesPage.css';
import { useAuth } from '../../../hooks/useAuth';

function ParentMatchesPage() {
  const { getMatches } = matchesController();
  const { fetchTeams } = teamsController();
  const { userDni } = useAuth();

  const [matches, setMatches] = useState([]);
  const [newMatchesList, setNewMatchesList] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper: find the player's DNI and matching team for a parent user
  function getPlayerTeams(teams, userDni) {
    // For each team, find any player with parent_dni == userDni
    const playerTeams = [];
    teams.forEach(team => {
      if (Array.isArray(team.players)) {
        team.players.forEach(player => {
          if (String(player.parent_dni) === String(userDni)) {
            playerTeams.push({
              team,
              playerDni: player.dni,
              match_id: team.match_id
            });
          }
        });
      }
    });
    return playerTeams;
  }

  // Data fetching and filtering
  const updateList = () => {
    try {
      // Find all player-team pairs for the parent's children
      const playerTeams = getPlayerTeams(teams, userDni);

      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // For each match, collect all playerTeams for this match
      const finalMatches = [];
      newMatchesList.forEach(match => {
        // Only consider matches with a date in the future
        if (!match.fecha) return;
        const matchDate = new Date(match.fecha + "T00:00:00");
        if (matchDate <= today) return; // Skip matches not in the future

        // Find ALL playerTeams for this match
        const pts = playerTeams.filter(pt => pt.match_id === match.match_id);
        pts.forEach(pt => {
          finalMatches.push({
            ...match,
            team: pt.team,
            playerDni: pt.playerDni,
          });
        });
      });
      setMatches(finalMatches);
    } catch (error) {
      console.log('Error filtering matches:', error);
    }
  };

  const getInitData = async () => {
    try {
      const matchesData = await getMatches();
      const teamsData = await fetchTeams();
      setNewMatchesList(matchesData);
      setTeams(teamsData);
    } catch (error) {
      console.log('Error fetching initial data:', error);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    if (teams.length > 0 && newMatchesList.length > 0) {
      updateList();
    }
  }, [teams, newMatchesList]);

  // Refresh teams & matches after confirming assistance
  const refreshData = () => getInitData();

  return (
    <>
      <Navbar />
      <div className="matches-container">
        <h2>Próximos partidos</h2>
        <p>Aquí puedes ver los próximos partidos de tus hijos</p>
        <div className="matches-button-container"></div>
        <div className="matches-list">
          {matches.length === 0 ? (
            <p>No hay partidos disponibles. Haz clic en "Actualizar Partidos".</p>
          ) : (
            matches.map((item, idx) => (
              <MatchCard
                key={`${item.match_id}-${item.playerDni}`} // Now key is match and child
                time={item.hora}
                date={item.fecha}
                localTeam="San Esteban"
                rivalTeam={item.rival}
                category={item.category.gender + " " + item.category.year}
                fieldAddress={item.cancha.address}
                match_id={item.match_id}
                team={item.team}
                playerDni={item.playerDni}
                onConfirmAssistance={refreshData}
                cancha={item.cancha}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ParentMatchesPage;