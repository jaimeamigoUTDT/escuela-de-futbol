import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import "./Players.css"
import Navbar from "../../components/layout/Navbar"
import PlayerCard from "./components/PlayerCard"
import AddPlayerModal from "./components/addPlayerModal"
import playersController from "../../controllers/playersController"

function PlayersPage() {
  const { getPlayers } = playersController();
  const { userDni } = useAuth()
  const [players, setPlayers] = useState([]) // Get players from context
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch players when the component mounts (only once)
  useEffect(() => {
    updateList()
  }, []) // This will run on mount and whenever players changes

  const filterPlayers = (players) => {
    const filtered = []

    for (let i = 0; i < players.length; i++) {
      if (players[i].parent !== null) {
        if (players[i].parent.dni === userDni) {
          filtered.push(players[i])
        }
      }
    }
    return filtered
  }

  const updateList = async () => {
    try {
      const players = await getPlayers(); // Fetch players from the server

      setPlayers(players) // Update the players in context

      const filteredPlayers = filterPlayers(players) // Filter players based on the parent DNI

      setFilteredPlayers(filteredPlayers) // Update local state with all players

      // No need to call setFilteredPlayers here as the useEffect will trigger again
    } catch (error) {
      console.error("Error updating players:", error)
    }
  }

  const handleAddPlayer = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    updateList() // Refresh the list when modal is closed
  }

  useEffect(() => {
    setFilteredPlayers(filterPlayers(players))
  }, [players, userDni])

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
                  name={item.name}
                  surname={item.surname}
                  dateOfBirth={item.date_of_birth}
                  gender={item.gender}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <AddPlayerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default PlayersPage
