import { useState, useEffect } from "react"
import { usePlayers } from "../../context/PlayersContext"
import { useTeams } from "../../context/TeamsContext"
import "./Teams.css"
import Navbar from "../../components/layout/Navbar"
import TeamList from "./components/TeamsList"
import { teamsController } from "../../controllers/teamsController" // Adjust the path as necessary
import addTeamModal from "./components/addTeamModal"

function TeamsPage() {
  const { updatePlayers } = usePlayers()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { teams } = useTeams() // Get teams directly from context
  const { fetchTeams } = teamsController() // Initialize teamsController

  // Fetch players when the component mounts (only once)
  useEffect(() => {
    updatePlayers()
    updateTeamList() // Fetch teams when the component mounts
    // eslint-disable-next-line
  }, [])

  const updateTeamList = async () => {
    await fetchTeams() // This will update the teams in context
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModel = () => {
    setIsModalOpen(true)
  }

  // Called after a team is added in the modal
  const handleTeamAdded = () => {
    updateTeamList()
  }

  return (
    <>
      <Navbar />
      <div className="players-container" style={{ display: "flex", width: "100%" }}>
        {/* Left Side: Placeholder Component (70%) */}
        <div style={{ width: "100%", padding: "20px"}}>
          <h2>Equipos</h2>
          <p>Aquí podes ver todos los equipos que armaste para la próxima fecha:</p>
          <div className="players-button-container">
            <button onClick={handleOpenModel}>Crear equipo</button>
            <button onClick={updateTeamList}>Actualizar Equipos</button>
          </div>
          <TeamList teams={teams} />
        </div>
      </div>
      <addTeamModal isOpen={isModalOpen} onClose={handleCloseModal} onTeamAdded={handleTeamAdded} />
    </>
  )
}

export default TeamsPage