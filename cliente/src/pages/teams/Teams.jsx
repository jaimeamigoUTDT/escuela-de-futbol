import { useState, useEffect } from "react"
import { useTeams } from "../../context/TeamsContext"
import "./Teams.css"
import Navbar from "../../components/layout/Navbar"
import TeamList from "./components/TeamsList"
import { teamsController } from "../../controllers/teamsController"
import AddTeamModal from "./components/addTeamModal"

function TeamsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { teams } = useTeams() // Get teams from context
  const { fetchTeams, deleteTeam } = teamsController()

  useEffect(() => {
    updateTeamList()
    // eslint-disable-next-line
  }, [])

  const updateTeamList = async () => {
    await fetchTeams()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // Called after a team is added in the modal
  const handleTeamAdded = () => {
    updateTeamList()
  }

  // This will be passed to TeamList, which will call it with the team id
  const handleDeleteTeam = async (teamId) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este equipo?")) {
      try {
        await deleteTeam(teamId)
        await updateTeamList()
      } catch (error) {
        console.error("Error al eliminar el equipo:", error)
        alert("No se pudo eliminar el equipo.")
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="players-container" style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "100%", padding: "20px" }}>
          <h2>Equipos</h2>
          <p>Aquí podes ver todos los equipos que armaste para la próxima fecha:</p>
          <div className="players-button-container">
            <button onClick={handleOpenModal}>Crear equipo</button>
            <button onClick={updateTeamList}>Actualizar Equipos</button>
          </div>
          {/* Pass the handler itself; TeamList will call it with correct team id */}
          <TeamList teams={teams} handleDeleteTeam={handleDeleteTeam} />
        </div>
      </div>
      <AddTeamModal isOpen={isModalOpen} onClose={handleCloseModal} onTeamAdded={handleTeamAdded} />
    </>
  )
}

export default TeamsPage