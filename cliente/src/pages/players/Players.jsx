// src/components/MatchesPage.jsx
import React, { useState } from 'react';
import { useMatches } from '../../context/MatchesContext';
import Navbar from '../../components/layout/Navbar';
import './matches.css';
import MatchCard from '../../components/common/MatchCard';
import AddMatchModal from "./components/addMatchModal";
import { useEffect } from 'react';

function MatchesPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch matches when the component mounts (only once)
    useEffect(() => {
    }, []); // Empty dependency array ensures this runs only once on mount

  const updateList = async () => {
    try {
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