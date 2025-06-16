import "./TeamCard.css"
import { useState } from "react"
import SelectPlayersModal from "./selectPlayerModal"

const TeamCard = ({ team, onViewPlayers, onEditTeam, allPlayers, onUpdateTeamPlayers }) => {
  const [isSelectPlayersModalOpen, setIsSelectPlayersModalOpen] = useState(false)

  const handleAddPlayers = () => {
    setIsSelectPlayersModalOpen(true)
  }

  const handleSavePlayerSelection = (teamId, selectedPlayerIds) => {

    onUpdateTeamPlayers(teamId, selectedPlayerIds)
  }

  return (
    <div className="team-card-item">
      <div>
        <p>
          <strong>{team.name || "N/A"}</strong>
        </p>
        <p>
          <strong>Categoría:</strong>{" "}
          {team.category?.gender && team.category?.year ? `${team.category.gender} ${team.category.year}` : "N/A"}
        </p>
        <p>
          <strong>Jugadores elegidos:</strong> {team.players_ids?.length || "0"}
        </p>
        <p>
          <strong>Jugadores confirmados:</strong> {team.confirmed_players_ids?.length || "0"}
        </p>
      </div>
      <div>
          <p>
            <strong>Info partido:</strong>
          </p>
          {team.match ? (
            <div>
              <p>Rival: {team.match.rival || "N/A"}</p>
              <p>
                Fecha y hora: {team.match.fecha || "N/A"} a las {team.match.hora || "N/A"}
              </p>
              <p>Ubicación: {team.match.cancha?.address || "N/A"}</p>
            </div>
          ) : (
            <p>No asignado</p>
          )}
      </div>
      <div className="button-container">
          
          <button className="add-player-button" onClick={handleAddPlayers}>
          + Agregar jugadores
          </button>
          <button className="view-players-button" onClick={() => onViewPlayers(team.players)} aria-label="Ver jugadores">
            Ver jugadores
          </button>
          <button className="edit-button" onClick={() => onEditTeam(team)} aria-label="Editar equipo">
            Editar datos de equipo
          </button>
        </div>
    
      {/* Add the SelectPlayersModal */}
      <SelectPlayersModal
        isOpen={isSelectPlayersModalOpen}
        onClose={() => setIsSelectPlayersModalOpen(false)}
        allPlayers={allPlayers}
        teamPlayers={team.players}
        onSaveSelection={handleSavePlayerSelection}
        teamId={team.team_id}
      />
    </div>
  )
}

export default TeamCard
