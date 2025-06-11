import { React, useState, useEffect } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import './AdminPlayers.css';
import Navbar from '../../components/layout/Navbar';
import PlayerCard from './components/PlayerCard';
import AddPlayerModal from './components/addPlayerModal';

function AdminPlayersPage() {
  const { players, updatePlayers } = usePlayers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch players when the component mounts (only once)
  useEffect(() => {
    updatePlayers();
  }, []); // Empty dependency array ensures this runs only once on mount

  const updateList = async () => {
    try {
      await updatePlayers(); // Fetch players from the server
      console.log('Players fetched successfully:', players);
    } catch (error) {
      console.log('Error fetching players:', error);
    }
  };

  const handleAddPlayer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="players-container" style={{ display: 'flex', width: '100%' }}>
        {/* Left Side: Placeholder Component (70%) */}
        <div style={{ width: '70%', padding: '20px' }}>
          <h2>Placeholder Component</h2>
          <p>This is a placeholder for the left side component.</p>
          {/* Add your custom component content here */}
        </div>

        {/* Right Side: Players List (30%) */}
        <div style={{ width: '30%', padding: '20px' }}>
          <h2>Jugadores</h2>
          <p>Aquí puedes ver los jugadores registrados.</p>
          <div className="players-button-container">
            <button onClick={updateList}>Actualizar Jugadores</button>
            <button className="players-add-match" onClick={handleAddPlayer}>
              Agregar Jugador
            </button>
          </div>
          <div className="players-list">
            {players.length === 0 ? (
              <p>No hay jugadores registrados. Haz clic en "Actualizar Jugadores".</p>
            ) : (
              players.map((item) => (
                <PlayerCard
                  key={item.dni}
                  name={item.name}
                  surname={item.surname}
                  dateOfBirth={item.dateOfBirth}
                  gender={item.gender}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <AddPlayerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default AdminPlayersPage;