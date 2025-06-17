import React, { useState, useEffect } from 'react';
import { matchesController } from "../../../controllers/matchesController";
import Navbar from '../../../components/layout/Navbar';
import './AdminMatchesPage.css';
import MatchCard from '../../../components/common/MatchCard';
import AddMatchModal from "./components/addMatchModal";

function AdminMatchesPage() {

  const { getMatches, deleteMatch } = matchesController();

  const [matches, setMatches] = useState([]); // Fetch matches from the controller
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateList = async () => {
    try {
      const newMatchesList = await getMatches(); // Fetch matches from the server
      console.log('Matches fetched successfully:', newMatchesList);

      // Filter to only show matches that are today or in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filteredMatches = (newMatchesList || []).filter(match => {
        if (!match.fecha) return false;
        const matchDate = new Date(match.fecha + "T00:00:00");
        return matchDate >= today;
      });

      // Sort the matches so that the soonest match comes first
      filteredMatches.sort((a, b) => {
        const dateA = new Date(a.fecha + "T" + (a.hora || "00:00"));
        const dateB = new Date(b.fecha + "T" + (b.hora || "00:00"));
        return dateA - dateB;
      });

      setMatches(filteredMatches); 
    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  };

  // Fetch matches when the component mounts or when a match is updated
  useEffect(() => {
    updateList();
  }, []); // Only on mount

  const handleDeleteMatch = async (matchId) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este partido?")) {
      try {
        await deleteMatch(matchId);
        await updateList();
      } catch (error) {
        console.error("Error al eliminar el equipo:", error);
        alert("No se pudo eliminar el equipo.");
      }
    }
  };

  const handleAddMatch = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    updateList();
  }

  return (
    <>
      <Navbar />
      <div className="matches-container">
        <h2>Partidos</h2>
        <p>Aquí puedes ver los partidos programados.</p>
        <div className="matches-button-container">
          <button onClick={updateList}>Actualizar Partidos</button>
          <button className="matches-add-match" onClick={handleAddMatch}>Agregar Partido</button>
        </div>
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
                match_id={item.match_id}
                onDeleteMatch={() => handleDeleteMatch(item.match_id)}
                cancha={item.cancha}
              />
            ))
          )}
        </div>
      </div>
      <AddMatchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default AdminMatchesPage;