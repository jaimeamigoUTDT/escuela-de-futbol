import MatchesSection from "./MatchesSection"
import "./MatchesContent.css"
import { useAuth } from "../../../hooks/useAuth"

function MatchesContent() {

  const {userName} = useAuth()

  return (
    <div className="matches-content-card">
      <h1>Bienvenido {userName}</h1>
      <p>Los próximos partidos son: </p>
      <MatchesSection />
    </div>
  )
}

export default MatchesContent
