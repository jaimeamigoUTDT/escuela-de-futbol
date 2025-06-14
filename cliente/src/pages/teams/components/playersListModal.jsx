import React from "react"
import "./playersListModal.css"

const PlayersListModal = ({ isOpen, onClose, players = [], confirmedPlayers = [], unconfirmedPlayers = [], team }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Jugadores del equipo</h3>
        <button className="close-modal" onClick={onClose}>×</button>
        {confirmedPlayers.length > 0 && (
          <>
            <h4 style={{ color: "#2e7d32" }}>Confirmados</h4>
            <ul className="players-list confirmed-list">
              {confirmedPlayers.map((player) => (
                <li key={player.dni} style={{ color: "#2e7d32" }}>
                  {player.name} {player.surname} (DNI: {player.dni})
                </li>
              ))}
            </ul>
          </>
        )}
        {unconfirmedPlayers.length > 0 && (
          <>
            <h4 style={{ color: "#b71c1c" }}>No confirmados</h4>
            <ul className="players-list unconfirmed-list">
              {unconfirmedPlayers.map((player) => (
                <li key={player.dni} style={{ color: "#b71c1c" }}>
                  {player.name} {player.surname} (DNI: {player.dni})
                </li>
              ))}
            </ul>
          </>
        )}
        {confirmedPlayers.length === 0 && unconfirmedPlayers.length === 0 && (
          <p>No hay jugadores en este equipo.</p>
        )}
      </div>
    </div>
  )
}

export default PlayersListModal