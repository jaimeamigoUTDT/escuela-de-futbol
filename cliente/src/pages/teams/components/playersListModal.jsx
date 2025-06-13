"use client"

import "./PlayersListModal.css"

const PlayersListModal = ({ isOpen, onClose, players }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Lista de Jugadores</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {players && players.length > 0 ? (
            <div className="players-grid">
              {players.map((player) => (
                <div key={player.dni} className="player-card">
                  <div className="player-info">
                    <p>
                      <strong>{player.name + " " + player.surname || "N/A"}</strong> 
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay jugadores en este equipo.</p>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default PlayersListModal
