import React, { useState, useEffect } from 'react';
import { resultsController } from "../../controllers/resultsController";
import Navbar from '../../components/layout/Navbar';
import './Results.css';
import ResultCard from '../../components/common/ResultCard';
import addResultModal from "./components/addResultModal";
import { useAuth } from "../../hooks/useAuth"; // <-- Add this import

function ResultsPage() {
  const { getResults } = resultsController();
  const { userRole } = useAuth(); // <-- Get userRole from auth

  let [results, setResults] = useState([]); // Fetch results from the controller
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateList = async () => {
    try {
      const newResultsList = await getResults(); // Fetch results from the server
      console.log('Results fetched successfully:', newResultsList); // Log the fetched matches

      // Only show results from matches older than today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filteredResults = (newResultsList || []).filter(result => {
        const matchFecha = result.match?.fecha;
        if (!matchFecha) return false;
        const matchDate = new Date(matchFecha + "T00:00:00");
        return matchDate < today;
      });

      setResults(filteredResults);
    } catch (error) {
      console.log('Error fetching results:', error);
    }
  };

  // Fetch results when the component mounts (only once)
  useEffect(() => {
    updateList();
    // eslint-disable-next-line
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleAddResult = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Only show "Cargar Resultado" if the user is admin or superAdmin
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
      <addResultModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default ResultsPage; 