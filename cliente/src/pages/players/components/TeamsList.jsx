"use client"

// TeamsList.jsx
import { useState, useEffect } from "react"
import TeamCard from "./TeamCard"
import PlayersListModal from "./playersListModal"
import EditTeamModal from "./editTeamModal"
import "./TeamsList.css"
import { teamsController } from "../../../controllers/teamsController"
import { usePlayers } from "../../../context/PlayersContext"

const TeamsList = ({ teams: teamsProp }) => {
  // State for modals
  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [teams, setTeamsState] = useState(teamsProp || []) // State to hold teams
  const { editTeam, updateTeamPlayers } = teamsController()
  const { players } = usePlayers() // Get all players from context

  useEffect(() => {
    if (teamsProp && teamsProp.length > 0) {
      setTeamsState(teamsProp)
    }
  }, [teamsProp])

  // Handle viewing players in modal
  const handleViewPlayers = (players) => {
    setSelectedTeamPlayers(players || [])
    setIsPlayersModalOpen(true)
  }

  // Handle editing team in modal
  const handleEditTeam = (team) => {
    setSelectedTeam(team)
    setIsEditModalOpen(true)
  }

  // Handle saving team changes
  const handleSaveTeam = async (updatedTeam) => {
    setIsSaving(true)
    setSaveError(null)

    try {
      // Call the editTeam function from context
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

    try {
      // Call the updateTeamPlayers function
      await updateTeamPlayers(teamId, selectedPlayerIds)

      // Update local state to reflect changes
      setTeamsState((prevTeams) =>
        prevTeams.map((team) => {
          if (team.team_id === teamId) {
            // Find the full player objects for the selected IDs
            const updatedPlayers = selectedPlayerIds
              .map((id) => players.find((player) => player.player_id === id))
              .filter(Boolean) // Remove any undefined values

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

  // Close modals
  const closePlayersModal = () => {
    setIsPlayersModalOpen(false)
    setSelectedTeamPlayers([])
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedTeam(null)
    setSaveError(null)
  }

  return (
    <div className="team-list-container">
      {
        <div className="team-card">
          {teams && teams.length > 0 ? (
            teams.map((team) => (
              <TeamCard
                key={team.team_id}
                team={team}
                onViewPlayers={handleViewPlayers}
                onEditTeam={handleEditTeam}
                allPlayers={players}
                onUpdateTeamPlayers={handleUpdateTeamPlayers}
              />
            ))
          ) : (
            <p>No hay equipos disponibles.</p>
          )}
        </div>
      }

      <PlayersListModal isOpen={isPlayersModalOpen} onClose={closePlayersModal} players={selectedTeamPlayers} />

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
