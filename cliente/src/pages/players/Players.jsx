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
    return players.filter((player) => {
      const parentDni = player.parent?.dni || player.parent_dni;
      return parentDni && String(parentDni) === String(userDni);
    });
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {

    const month = dateString?.split("-")[1]
    const day = dateString?.split("-")[2]
    const year = dateString?.split("-")[0]

    // Format date to YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`

    return formattedDate;
  };

  const updateList = async () => {
    try {
      const fetchedPlayers = await getPlayers();

      // Format date_of_birth for each player
      const formattedPlayers = fetchedPlayers.map(player => ({
        ...player,
        date_of_birth: formatDate(player.date_of_birth)
      }));

      setPlayers(formattedPlayers);
      const filtered = filterPlayers(formattedPlayers);
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
                  category={item.category}
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