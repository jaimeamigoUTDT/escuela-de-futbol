import MatchesSection from "./MatchesSection"
import "./MatchesContent.css"

function MatchesContent() {
  return (
    <div className="matches-content-card">
      <h1>Bienvenido Esteban</h1>
      <p>Los próximos partidos son: </p>

      <MatchesSection />
    </div>
  )
}

export default MatchesContent
