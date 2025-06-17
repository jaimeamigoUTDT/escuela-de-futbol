import "./MatchesSection.css";
import MatchCard from "../../../../components/common/MatchCard.jsx";
import { useEffect, useState } from 'react';
import { matchesController } from "../../../../controllers/matchesController.jsx";

function MatchesSection() {
  const { getMatches, deleteMatch } = matchesController();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateList = async () => {
    setLoading(true);
    setError(null);

    try {
      const newMatchesList = await getMatches();
      console.log('Matches fetched:', newMatchesList);

      // Validate response
      if (!Array.isArray(newMatchesList)) {
        throw new Error('Expected an array of matches, got:', newMatchesList);
      }

      // Filter matches to only those whose date is today or in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time part

      const filteredMatches = newMatchesList.filter(match => {
        // Assume match.fecha is in 'YYYY-MM-DD' format
        if (!match.fecha) return false;
        const matchDate = new Date(match.fecha + "T00:00:00");
        return matchDate >= today;
      });

      setMatches(filteredMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateList();
  }, []); // Run once on mount

  const matchItems = matches.length > 0 ? matches : [];
  const displayedMatches = matchItems.length > 2 ? matchItems.slice(0, 2) : matchItems;
  const showMoreButton = matchItems.length > 2;

  const handleViewMore = () => {
    window.location.href = "/partidos";
  };

  const handleDeleteMatch = async (matchId) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este partido?")) {
      try {
        await deleteMatch(matchId);
        await updateList(); // <-- reload after delete
      } catch (error) {
        console.error("Error al eliminar el equipo:", error);
        alert("No se pudo eliminar el equipo.");
      }
    }
  };

  return (
    <div>
      {loading && <p className="loading">Cargando partidos...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && matchItems.length === 0 && (
        <p className="no-matches">No hay partidos disponibles.</p>
      )}
      <div className="matches-section">
        {displayedMatches.map((item) => (
          <MatchCard
            key={item.match_id}
            time={item.hora}
            date={item.fecha}
            localTeam="San Esteban"
            rivalTeam={item.rival}
            category={item.category.gender + " " + item.category.year}
            fieldAddress={item.cancha.address}
            match_id={item.match_id}
            onDeleteMatch={() => handleDeleteMatch(item.match_id)}
            cancha={item.cancha}
          />
        ))}
      </div>
      {showMoreButton && (
        <div className="view-more-container">
          <button className="view-more-button" onClick={handleViewMore}>
            Ver más partidos
          </button>
        </div>
      )}
    </div>
  );
}

export default MatchesSection;