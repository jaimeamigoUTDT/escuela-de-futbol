// src/components/MatchesPage.jsx
import React, { useState, useEffect } from 'react';
import { matchesController } from "../../../controllers/matchesController";
import { teamsController } from "../../../controllers/teamsController";
import Navbar from '../../../components/layout/Navbar';
import './ParentMatchesPage.css';
import MatchCard from '../../../components/common/MatchCard';
import AddMatchModal from "./components/addMatchModal";
import { useAuth } from '../../../hooks/useAuth';

function ParentMatchesPage() {
  const { getMatches } = matchesController();
  const { fetchTeams } = teamsController();
  const { userDni } = useAuth();

  const [matches, setMatches] = useState([]);
  const [newMatchesList, setNewMatchesList] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateList = () => {
    try {
      
      const selectedTeams = teams.filter(team =>
        team.players.some(player => Number(player.parent_dni) === Number(userDni))
      );

      const finalMatches = newMatchesList.filter(match =>
        selectedTeams.some(team => team.match_id === match.match_id)
      );

      setMatches(finalMatches);
    } catch (error) {
      console.log('Error filtering matches:', error);
    }
  };

  const getInitData = async () => {
    try {
      const matchesData = await getMatches();
      const teamsData = await fetchTeams();
      setNewMatchesList(matchesData); // Adjust based on your API response structure
      setTeams(teamsData); // Adjust based on your API response structure
    } catch (error) {
      console.log('Error fetching initial data:', error);
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    getInitData();
  }, [newMatchesList]);

  // Update matches list when teams or newMatchesList change
  useEffect(() => {

    console.log(teams, newMatchesList);

    if (teams.length > 0 && newMatchesList.length > 0) {
      updateList();
    }
  }, [teams, newMatchesList]);

  const handleAddMatch = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            matches.map((item) => (
              <MatchCard
                key={item.match_id}
                time={item.hora}
                date={item.fecha}
                localTeam="San Esteban"
                rivalTeam={item.rival}
                category={item.category.gender + " " + item.category.year}
                fieldAddress={item.cancha.address}
              />
            ))
          )}
        </div>
      </div>
      <AddMatchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default ParentMatchesPage;