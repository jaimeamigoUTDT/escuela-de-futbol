import "./MatchesSection.css"
import MatchCard from "./MatchCard"
import { useMatches } from "../../../context/MatchesContext.jsx"

function MatchesSection() {

  const { matches } = useMatches()

  const matchItems = matches.length > 0 ? matches : defaultMatches

  // Show only first 3 matches if there are more than 4
  const displayedMatches = matchItems.length > 4 ? matchItems.slice(0, 3) : matchItems
  const showMoreButton = matchItems.length > 4

  const handleViewMore = () => {
    window.location.href = "/partidos";
  }

  return (
    <div>
    <div className="matches-section">
      {displayedMatches.map((item) => (
        <MatchCard 
        key = {item.id}
        time={item.time}
        date={item.date}
        localTeam={item.localTeam}
        rivalTeam={item.rivalTeam}
        category={item.category}
        fieldAddress={item.fieldAddress}
        />
      ))}
    </div>

      {showMoreButton && (
        <div className = "view-more-container">
          <button className="view-more-button" onClick={handleViewMore}>
            Ver más partidos
          </button>
        </div>
      )}

    </div>
  )
}
export default MatchesSection
