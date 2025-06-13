import { React, useState, useEffect } from 'react';
import { usePlayers } from '../../context/PlayersContext';
import { useAuth } from '../../hooks/useAuth';
import './Players.css';
import Navbar from '../../components/layout/Navbar';
import PlayerCard from './components/PlayerCard';
import AddPlayerModal from './components/addPlayerModal';

function PlayersPage() {
  const { players, updatePlayers } = usePlayers();
  const { userDni } = useAuth();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch players when the component mounts (only once)
  useEffect(() => {
    updatePlayers();
    // Filter players by the user's DNI
    const filtered = players.filter(player => player.dni === userDni);

    setFilteredPlayers(filtered);
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
        <div style={{ width: '100%', padding: '20px' }}>
          <h2>Tus hijos</h2>
          <p>Aquí puedes ver los datos de tus hijos registrados.</p>
          <div className="players-button-container">
            <button className="players-add-match" onClick={handleAddPlayer}>
              Agregar hijo
            </button>
          </div>
          <div className="players-list">
            {filteredPlayers.length === 0 ? (
              <p>No hay jugadores registrados. Haz clic en "Actualizar Jugadores".</p>
            ) : (
              filteredPlayers.map((item) => (
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

export default PlayersPage;