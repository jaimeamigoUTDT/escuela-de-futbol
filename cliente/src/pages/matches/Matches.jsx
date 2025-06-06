// src/components/MatchesPage.jsx
import React, { useState } from 'react';
import { useMatches } from '../../context/MatchesContext';
import Navbar from '../../components/layout/Navbar';
import './matches.css';
import MatchCard from '../../components/common/MatchCard';
import AddMatchModal from "./components/addMatchModal";

function MatchesPage() {

  const { matches, createMatch, deleteMatch, editMatc, updateMatches } = useMatches();
  const [isModalOpen, setIsModalOpen] = useState(false);

  updateMatches(); // Initial fetch of matches when the component mounts

  const updateList = async () => {
    try {
      await updateMatches(); // Fetch matches from the server
      console.log('Matches fetched successfully:', matches); // Log the fetched matches
    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  };

  const handleAddMatch = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteMatch = (id) => {
    deleteMatch(id)
  }

  return (
    <>
    <Navbar />
    <div className="matches-container">
      <h2>Partidos</h2>
      <p>Aquí puedes ver los partidos programados.</p>
      <div className = "matches-button-container">
        <button onClick={updateList}>Actualizar Partidos</button>
        <button className = "matches-add-match" onClick={handleAddMatch}>Agregar Partido</button>
      </div>
      <div className="matches-list">
        {matches.length === 0 ? (
          <p>No hay partidos disponibles. Haz clic en "Actualizar Partidos".</p>
        ) : (
          matches.map((item) => (
            <MatchCard 
              key = {item.id}
              time={item.time}
              date={item.date}
              localTeam={item.localTeam}
              rivalTeam={item.rivalTeam}
              category={item.category}
              fieldAddress={item.fieldAddress}
            />
          ))
        )}
      </div>

    </div>
    <AddMatchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
    
  );
}

export default MatchesPage;