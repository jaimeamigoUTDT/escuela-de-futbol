"use client"

import PropTypes from "prop-types"
import "./upcomingMatches.css"

function UpcomingMatches({ matches = [] }) {
  const defaultMatches = [
    {
      id: 1,
      teams: "Equipo A vs Equipo B",
      time: "Sábado 16:00",
    },
    {
      id: 2,
      teams: "Equipo C vs Equipo D",
      time: "Domingo 14:00",
    },
  ]

  const matchItems = matches.length > 0 ? matches : defaultMatches

  return (
    <div className="sidebar-card">
      <h3>Próximos Partidos</h3>
      {matchItems.map((match) => (
        <div key={match.id} className="match-item">
          <div className="match-teams">
            <span>{match.teams}</span>
          </div>
          <div className="match-time">
            <span>{match.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

UpcomingMatches.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      teams: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ),
}

export default UpcomingMatches
