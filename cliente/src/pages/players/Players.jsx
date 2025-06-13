"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./Players.css";
import Navbar from "../../components/layout/Navbar";
import PlayerCard from "./components/PlayerCard";
import AddPlayerModal from "./components/addPlayerModal";
import playersController from "../../controllers/playersController";

function PlayersPage() {
  const { getPlayers } = playersController();
  const { userDni } = useAuth();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch and filter players on mount
  useEffect(() => {
    updateList();
  }, []);

  const filterPlayers = (players) => {
    console.log("Input players:", players);
    console.log("userDni:", userDni);

    return players.filter((player) => {
      console.log("Checking player:", player.name, {
        parent: player.parent,
        parent_dni: player.parent_dni,
      });
      const parentDni = player.parent?.dni || player.parent_dni;
      return parentDni && String(parentDni) === String(userDni);
    });
  };

  const updateList = async () => {
    try {
      const fetchedPlayers = await getPlayers();
      setPlayers(fetchedPlayers);
      const filtered = filterPlayers(fetchedPlayers);
      setFilteredPlayers(filtered);
    } catch (error) {
      console.error("Error updating players:", error);
      alert("Error fetching players. Please try again.");
    }
  };

  const handleAddPlayer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    updateList(); // Refresh after adding a player
  };

  return (
    <>
      <Navbar />
      <div className="players-container" style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "100%", padding: "20px" }}>
          <h2>Tus hijos</h2>
          <p>Aquí puedes ver los datos de tus hijos registrados.</p>
          <div className="players-button-container">
            <button className="players-add-match" onClick={handleAddPlayer}>
              Agregar hijo
            </button>
          </div>
          <div className="players-list">
            {filteredPlayers.length === 0 ? (
              <p>No hay jugadores registrados.</p>
            ) : (
              filteredPlayers.map((item) => (
                <PlayerCard
                  key={item.dni}
                  dni={item.dni}
                  name={item.name}
                  surname={item.surname}
                  dateOfBirth={item.date_of_birth}
                  gender={item.gender}
                  parent={item.parent}
                  updateList={updateList} // Pass updateList
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