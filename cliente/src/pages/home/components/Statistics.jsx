"use client"

import PropTypes from "prop-types"
import "./statistics.css"

function Statistics({ stats = {} }) {
  const defaultStats = {
    partidos: 24,
    victorias: 18,
    empates: 4,
    derrotas: 2,
  }

  const statisticsData = Object.keys(stats).length > 0 ? stats : defaultStats

  const statItems = [
    { key: "partidos", label: "Partidos Jugados", value: statisticsData.partidos },
    { key: "victorias", label: "Victorias", value: statisticsData.victorias },
    { key: "empates", label: "Empates", value: statisticsData.empates },
    { key: "derrotas", label: "Derrotas", value: statisticsData.derrotas },
  ]

  return (
    <div className="sidebar-card">
      <h3>Estadísticas</h3>
      {statItems.map((stat) => (
        <div key={stat.key} className="stat-item">
          <span className="stat-label">{stat.label}:</span>
          <span className="stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

Statistics.propTypes = {
  stats: PropTypes.shape({
    partidos: PropTypes.number,
    victorias: PropTypes.number,
    empates: PropTypes.number,
    derrotas: PropTypes.number,
  }),
}

export default Statistics
