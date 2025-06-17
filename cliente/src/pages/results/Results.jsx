import React, { useState, useEffect } from 'react';
import { resultsController } from "../../controllers/resultsController";
import Navbar from '../../components/layout/Navbar';
import './Results.css';
import ResultCard from '../../components/common/ResultCard';
import AddResultModal from "./components/addResultModal";
import { useAuth } from "../../hooks/useAuth";
import playersController from "../../controllers/playersController";
import { teamsController } from "../../controllers/teamsController";

function ResultsPage() {
  const { getResults } = resultsController();
  const { userRole, userDni } = useAuth();
  const { getChildrenOfParent } = playersController();
  const { getTeamsByChildren } = teamsController();

  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateList = async () => {
    try {
      const allResults = await getResults();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Only show results from matches older than today
      const filteredResults = (allResults || []).filter(result => {
        const matchFecha = result.match?.fecha;
        if (!matchFecha) return false;
        const matchDate = new Date(matchFecha + "T00:00:00");
        return matchDate < today;
      });

      // Filtering for parents
      if (userRole === "parent") {
        // 1. Get children DNIs
        const childrenRes = await getChildrenOfParent(userDni);
        const children = Array.isArray(childrenRes) ? childrenRes : childrenRes?.data ?? [];
        if (!children.length) {
          setResults([]); // No children, show nothing
          return;
        }

        // 2. Get teams for these children
        const teams = await getTeamsByChildren(children);
        // 3. Collect all match_ids from those teams
        const allowedMatchIds = new Set();
        (teams || []).forEach(team => {
          if (team.match_id) allowedMatchIds.add(team.match_id);
        });

        // 4. Filter results by allowed match_ids
        const parentResults = filteredResults.filter(result =>
          result.match && allowedMatchIds.has(result.match.match_id)
        );
        setResults(parentResults);
      } else {
        // For admins and superAdmins, show all
        setResults(filteredResults);
      }
    } catch (error) {
      console.log('Error fetching results:', error);
      setResults([]);
    }
  };

  // Fetch results when the component mounts (only once)
  useEffect(() => {
    updateList();
    // eslint-disable-next-line
  }, [userRole, userDni]); // Make sure to update if auth changes

  const handleAddResult = () => {
    setIsModalOpen(true)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
    updateList();
  };

  const canAddResult = userRole === "admin" || userRole === "superAdmin";

  return (
    <>
      <Navbar />
      <div className="results-container">
        <h2>Resultados</h2>
        <p>Aquí puedes ver los resultados de partidos pasados</p>
        <div className="results-button-container">
          <button onClick={updateList}>Actualizar Resultados</button>
          {canAddResult && (
            <button className="results-add-result" onClick={handleAddResult}>Cargar Resultado</button>
          )}
        </div>
        <div className="results-list">
          {results.length === 0 ? (
            <p>No hay resultados disponibles. Haz clic en "Actualizar Resultados".</p>
          ) : (
            results.map((item) => (
              <ResultCard
                key={item.result_id}
                date={item.match.fecha}
                category={`${item.category.gender} - ${item.category.year}`}
                localTeam="San Esteban"
                rivalTeam={item.match.rival}
                localScore={item.resultado_san_esteban}
                rivalScore={item.resultado_rival}
              />
            ))
          )}
        </div>
      </div>
      <AddResultModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default ResultsPage;