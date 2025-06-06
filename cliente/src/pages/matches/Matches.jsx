// src/components/MatchesPage.jsx
import { useMatches } from '../../context/MatchesContext';
import Navbar from '../../components/layout/Navbar';
import './matches.css';
import MatchCard from '../../components/common/MatchCard';

function MatchesPage() {

  const { matches, createMatch, deleteMatch, editMatc, updateMatches } = useMatches();

  const updateList = async () => {
    try {
      await updateMatches(); // Fetch matches from the server
      console.log('Matches fetched successfully:', matches); // Log the fetched matches
    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  };

  const handleDeleteMatch = (id) => {
    deleteMatch(id)
  }

  return (
    <>
    <Navbar />
    <div className="matches-container">
      <h2>Partidos</h2>
      <p>Aquí puedes ver los partidos programados.</p>
      <div className = "matches-button-container">
        <button onClick={updateList}>Actualizar Partidos</button>
        <button className = "matches-add-match" onClick={updateList}>Agregar Partido</button>
      </div>
      <div className="matches-list">
        {matches.length === 0 ? (
          <p>No hay partidos disponibles. Haz clic en "Actualizar Partidos".</p>
        ) : (
          matches.map((item) => (
            <MatchCard 
              key = {item.id}
              time={item.time}
              date={item.date}
              localTeam={item.localTeam}
              rivalTeam={item.rivalTeam}
              category={item.category}
              fieldAddress={item.fieldAddress}
            />
          ))
        )}
      </div>

    </div>
    </>
    
  );
}

export default MatchesPage;