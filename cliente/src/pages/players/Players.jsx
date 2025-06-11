// src/components/MatchesPage.jsx
import React, { useState } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import Navbar from '../../components/layout/Navbar';
import './players.css';
import PlayerCard from '../../components/common/PlayerCard';
import AddPlayerModal from "./components/addPlayerModal";
import { useEffect } from 'react';

function PlayersPage() {

  const { players, createPlayer, deletePlayer, editPlayer, updatePlayers } = usePlayers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch players when the component mounts (only once)
  useEffect(() => {
    updatePlayers();
  }, []); // Empty dependency array ensures this runs only once on mount

  const updateList = async () => {
    try {
      await updatePlayers(); // Fetch matches from the server
      console.log('Players fetched successfully:', players); // Log the fetched matches
    } catch (error) {
      console.log('Error fetching players:', error);
    }
  };

  const handleAddPlayer = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
    <Navbar />
    <div className="players-container">
      <h2>Jugadores</h2>
      <p>Aquí puedes ver los jugadores registrados.</p>
      <div className = "players-button-container">
        <button onClick={updateList}>Actualizar Jugadores</button>
        <button className = "players-add-match" onClick={handleAddPlayer}>Agregar Jugador</button>
      </div>
      <div className="players-list">
        {players.length === 0 ? (
          <p>No hay jugadores registrados. Haz clic en "Actualizar Partidos".</p>
        ) : (
          players.map((item) => (
            <PlayerCard
              key={item.dni}
              name={item.name}
              surname={item.surname}
              dateOfBirth={item.dateOfBirth}
            />
          ))
        )}
      </div>
    
    </div>
    <AddPlayerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
    
  );
}

export default PlayersPage;