import { useState, useEffect } from "react"
import "./playersListModal.css"
import "../../players/components/PlayerCard.css"
import "./selectPlayerModal.css"

const SelectPlayersModal = ({ isOpen, onClose, allPlayers, teamPlayers, onSaveSelection, teamId }) => {
  // State to track selected players
  const [selectedPlayers, setSelectedPlayers] = useState([])

  // Initialize selected players when modal opens
  useEffect(() => {
    if (isOpen && teamPlayers) {
      // Set initially selected players based on team's current players
      setSelectedPlayers(teamPlayers.map((player) => player.dni))
    }
  }, [isOpen, teamPlayers])

  if (!isOpen) return null

  // Toggle player selection
  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(playerId)) {
        // Remove player if already selected
        return prev.filter((id) => id !== playerId)
      } else {
        // Add player if not selected
        return [...prev, playerId]
      }
    })
  }

  // Handle save button click
  const handleSave = () => {

    onSaveSelection(teamId, selectedPlayers)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Seleccionar Jugadores</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">

          {allPlayers && allPlayers.length > 0 ? (
            <div className="players-grid">
              {allPlayers.map((player) => {
                const isSelected = selectedPlayers.includes(player.dni)
                return (
                  <div
                    key={player.dni}
                    
                    className={`player-card ${isSelected ? "selected-player" : ""}`}
                    onClick={() => togglePlayerSelection(player.dni)}
                  >
                    <div className="player-info">
                      <p>
                        <strong>
                          {player.surname}, {player.name || "N/A"}
                        </strong>
                      </p>
                      <p>
                        Categoría: {player.gender} - {new Date(player.date_of_birth).getFullYear() || "N/A"}
                      </p>
                      {isSelected && <div className="selection-indicator">✓</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p>No hay jugadores disponibles.</p>
          )}
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="save-button" onClick={handleSave}>
            Guardar Selección
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectPlayersModal
