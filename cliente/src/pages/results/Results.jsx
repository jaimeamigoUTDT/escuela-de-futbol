// src/components/MatchesPage.jsx
import React, { useState } from 'react';
import { resultsController } from "../../controllers/resultsController";
import Navbar from '../../components/layout/Navbar';
import './results.css';
import ResultCard from '../../components/common/ResultCard';
//import AddMatchModal from "./components/addMatchModal";
import { useEffect } from 'react';

function ResultsPage() {

  const { getResults } = resultsController();

  let [results, setResults] = useState([]); // Fetch results from the controller

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateList = async () => {
    try {
      
      const newResultsList = await getResults(); // Fetch results from the server
      
      console.log('Results fetched successfully:', newResultsList); // Log the fetched matches

      setResults(newResultsList); 

    } catch (error) {
      console.log('Error fetching results:', error);
    }
  };


    // Fetch matches when the component mounts (only once)
    useEffect(() => {
      updateList();

    }, [results]); // Empty dependency array ensures this runs only once on mount

  

  const handleAddMatch = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
    <Navbar />
    <div className="results-container">
      <h2>Resultados</h2>
      <p>Aquí puedes ver los resultados de partidos pasados</p>
      <div className = "resultados-button-container">
        <button onClick={updateList}>Actualizar Resultados</button>
      </div>
      
      <div className="results-list">
        {results.length === 0 ? (
          <p>No hay resultados disponibles. Haz clic en "Actualizar Resultados".</p>
        ) : (
          results.map((item) => (
            <ResultCard
                key={item.result_id}
                date={item.match.fecha}
                category={`${"completar"} - ${"completar"}`}
                localTeam="San Esteban"
                rivalTeam={item.match.rival}
                localScore={item.resultado_san_esteban}
                rivalScore={item.resultado_rival}
            />
          ))
        )}
      </div>
      
    </div>
    {/*<AddMatchModal isOpen={isModalOpen} onClose={handleCloseModal} />*/}
    </>
    
  );
}

export default ResultsPage;