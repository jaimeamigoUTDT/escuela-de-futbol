import "./MatchesSection.css";
import MatchCard from "../../../../components/common/MatchCard.jsx";
import { useEffect, useState } from 'react';
import { matchesController } from "../../../../controllers/matchesController.jsx";
import { teamsController } from "../../../../controllers/teamsController.jsx";
import { useAuth } from "../../../../hooks/useAuth.jsx";

function MatchesSection() {
  const { getMatches } = matchesController();
  const { fetchTeams } = teamsController();
  const { userDni } = useAuth();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMatchesList, setNewMatchesList] = useState([]);
  const [teams, setTeams] = useState([]);

  // Fetch initial data when component mounts
  useEffect(() => {
    const getInitData = async () => {
      setLoading(true);
      setError(null);
      try {
        const matchesData = await getMatches();
        const teamsData = await fetchTeams();
        setNewMatchesList(Array.isArray(matchesData) ? matchesData : []);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      } catch (error) {
        console.log('Error fetching initial data:', error);
        setError('Error fetching initial data');
      } finally {
        setLoading(false);
      }
    };
    getInitData();
  }, []);

  // Update matches list when teams or newMatchesList change
  useEffect(() => {
    if (teams.length > 0 && newMatchesList.length > 0) {
      try {
        // Filter teams for those that have a player whose parent_dni matches the current user
        const selectedTeams = teams.filter(team =>
          Array.isArray(team.players) &&
          team.players.some(player => player.parent_dni && String(player.parent_dni) === String(userDni))
        );

        // Filter matches that are associated with selected teams
        const finalMatches = newMatchesList.filter(match =>
          selectedTeams.some(team => team.match_id === match.match_id)
        );

        setMatches(finalMatches);
      } catch (error) {
        console.log('Error filtering matches:', error);
        setError('Error filtering matches');
      }
    } else {
      setMatches([]);
    }
  }, [teams, newMatchesList, userDni]);

  const matchItems = matches.length > 0 ? matches : [];
  const displayedMatches = matchItems.length > 2 ? matchItems.slice(0, 2) : matchItems;
  const showMoreButton = matches.length > 2;

  const handleViewMore = () => {
    window.location.href = "/partidos";
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