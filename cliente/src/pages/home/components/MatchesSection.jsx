import "./MatchesSection.css"
import MatchCard from "../../../components/common/MatchCard.jsx"
import { useMatches } from "../../../context/MatchesContext.jsx"

function MatchesSection() {

  const { matches, updateMatches } = useMatches()

  updateMatches() // Fetch matches when the component mounts

  const matchItems = matches.length > 0 ? matches : []

  // Show only first 3 matches if there are more than 4
  const displayedMatches = matchItems.length > 2 ? matchItems.slice(0, 2) : matchItems
  const showMoreButton = matchItems.length > 2

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
