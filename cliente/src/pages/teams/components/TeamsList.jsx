import { useState, useEffect } from "react"
import TeamCard from "./TeamCard.jsx"
import PlayersListModal from "./playersListModal.jsx"
import EditTeamModal from "./editTeamModal.jsx"
import "./TeamsList.css"
import { teamsController } from "../../../controllers/teamsController"
import playersController from "../../../controllers/playersController"

const TeamsList = ({ teams: teamsProp, handleDeleteTeam }) => {
  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([])
  const [selectedTeamConfirmedPlayers, setSelectedTeamConfirmedPlayers] = useState([])
  const [selectedTeamUnconfirmedPlayers, setSelectedTeamUnconfirmedPlayers] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [teams, setTeamsState] = useState(teamsProp || [])
  const { editTeam } = teamsController()
  const { getPlayers } = playersController()
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (teamsProp) {
      // Sort teams by match date and time
      const sortedTeams = [...teamsProp].sort((a, b) => {
        const dateA = a.match ? new Date(`${a.match.fecha}T${a.match.hora}`) : new Date(0)
        const dateB = b.match ? new Date(`${b.match.fecha}T${b.match.hora}`) : new Date(0)
        return dateA - dateB
      })
      setTeamsState(sortedTeams)
    }
    handleFetchPlayers()
    // eslint-disable-next-line
  }, [teamsProp])

  // Handle viewing players in modal
  const handleViewPlayers = (playersList, team) => {
    setSelectedTeam(team)
    const confirmedIds = Array.isArray(team.confirmed_players_ids) ? team.confirmed_players_ids : []
    const confirmed = []
    const unconfirmed = []
    ;(playersList || []).forEach(player => {
      if (confirmedIds.includes(player.dni)) {
        confirmed.push(player)
      } else {
        unconfirmed.push(player)
      }
    })
    setSelectedTeamPlayers(playersList || [])
    setSelectedTeamConfirmedPlayers(confirmed)
    setSelectedTeamUnconfirmedPlayers(unconfirmed)
    setIsPlayersModalOpen(true)
  }

  // Handle editing team in modal
  const handleEditTeam = (team) => {
    setSelectedTeam(team)
    setIsEditModalOpen(true)
  }

  const handleFetchPlayers = async () => {
    try {
      const fetchedPlayers = await getPlayers()
      setPlayers(fetchedPlayers || [])
    } catch (error) {
      console.error("Error fetching players:", error)
      alert("Error al obtener los jugadores. Por favor, inténtalo de nuevo.")
    }
  }

  // Handle saving team changes
  const handleSaveTeam = async (updatedTeam) => {
    setIsSaving(true)
    setSaveError(null)
    try {
      await editTeam(updatedTeam)
      closeEditModal()
    } catch (error) {
      console.error("Error saving team:", error)
      setSaveError("Error al guardar los cambios. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle updating team players
  const handleUpdateTeamPlayers = async (teamId, selectedPlayerIds) => {
    setIsSaving(true)
    setSaveError(null)
    const selectedTeam = teams.find((team) => team.team_id === teamId)
    try {
      selectedTeam.players_ids = selectedPlayerIds
      await editTeam(selectedTeam)
      setTeamsState((prevTeams) =>
        prevTeams.map((team) => {
          if (team.team_id === teamId) {
            const updatedPlayers = selectedPlayerIds
              .map((id) => players.find((player) => player.dni === id))
              .filter(Boolean)
            return { ...team, players: updatedPlayers }
          }
          return team
        }),
      )
    } catch (error) {
      console.error("Error updating team players:", error)
      alert("Error al actualizar los jugadores del equipo. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSaving(false)
    }
  }

  const closePlayersModal = () => {
    setIsPlayersModalOpen(false)
    setSelectedTeamPlayers([])
    setSelectedTeamConfirmedPlayers([])
    setSelectedTeamUnconfirmedPlayers([])
    setSelectedTeam(null)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedTeam(null)
    setSaveError(null)
  }

  return (
    <div className="team-list-container">
      <div className="team-card">
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard
              key={new Date()}
              team={team}
              onViewPlayers={(playersList) => handleViewPlayers(playersList, team)}
              onEditTeam={handleEditTeam}
              onDeleteTeam={() => handleDeleteTeam(team.team_id)}
              allPlayers={players}
              onUpdateTeamPlayers={handleUpdateTeamPlayers}
            />
          ))
        ) : (
          <p>No hay equipos disponibles.</p>
        )}
      </div>
      <PlayersListModal
        isOpen={isPlayersModalOpen}
        onClose={closePlayersModal}
        players={selectedTeamPlayers}
        confirmedPlayers={selectedTeamConfirmedPlayers}
        unconfirmedPlayers={selectedTeamUnconfirmedPlayers}
        team={selectedTeam}
      />
      <EditTeamModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        team={selectedTeam}
        onSave={handleSaveTeam}
        isSaving={isSaving}
        error={saveError}
      />
    </div>
  )
}

export default TeamsList