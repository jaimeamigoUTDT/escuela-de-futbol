"use client"

import PropTypes from "prop-types"
import "./newsSection.css"

function NewsSection({ news = [] }) {
  const defaultNews = [
    {
      id: 1,
      title: "Próximo Torneo Juvenil",
      content: "Se acerca el torneo juvenil de primavera. ¡Inscripciones abiertas!",
      date: "15 de Marzo, 2024",
    },
    {
      id: 2,
      title: "Resultados del Fin de Semana",
      content: "Revisa los resultados de los partidos del último fin de semana.",
      date: "12 de Marzo, 2024",
    },
  ]

  const newsItems = news.length > 0 ? news : defaultNews

  return (
    <div className="news-section">
      <h2>Últimas Noticias</h2>
      {newsItems.map((item) => (
        <div key={item.id} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <span className="news-date">{item.date}</span>
        </div>
      ))}
    </div>
  )
}

NewsSection.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ),
}

export default NewsSection
