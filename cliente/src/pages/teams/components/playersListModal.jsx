import React from "react"
import "./playersListModal.css"

const PlayersListModal = ({
  isOpen,
  onClose,
  players = [],
  confirmedPlayers = [],
  unconfirmedPlayers = [],
  team
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Jugadores del equipo</h3>
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="players-cards-container">
          {confirmedPlayers.length > 0 && (
            <div className="players-card confirmed-card">
              <h4>Confirmados</h4>
              <ul className="players-list confirmed-list">
                {confirmedPlayers.map((player) => (
                  <li key={player.dni}>
                    {player.name} {player.surname} (DNI: {player.dni})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {unconfirmedPlayers.length > 0 && (
            <div className="players-card unconfirmed-card">
              <h4>No confirmados</h4>
              <ul className="players-list unconfirmed-list">
                {unconfirmedPlayers.map((player) => (
                  <li key={player.dni}>
                    {player.name} {player.surname} (DNI: {player.dni})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {confirmedPlayers.length === 0 && unconfirmedPlayers.length === 0 && (
            <p>No hay jugadores en este equipo.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayersListModal