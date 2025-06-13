// src/components/MatchesPage.jsx
import React, { useState } from 'react';
import { matchesController } from "../../../controllers/matchesController";
import Navbar from '../../../components/layout/Navbar';
import './AdminMatchesPage.css';
import MatchCard from '../../../components/common/MatchCard';
import AddMatchModal from "./components/addMatchModal";
import { useEffect } from 'react';

function AdminMatchesPage() {

  const { getMatches } = matchesController();

  let [matches, setMatches] = useState([]); // Fetch matches from the controller

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateList = async () => {
    try {
      
      const newMatchesList = await getMatches(); // Fetch matches from the server
      
      console.log('Matches fetched successfully:', newMatchesList); // Log the fetched matches

      setMatches(newMatchesList); 

    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  };


    // Fetch matches when the component mounts (only once)
    useEffect(() => {
      updateList();

    }, [matches]); // Empty dependency array ensures this runs only once on mount

  

  const handleAddMatch = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
    <Navbar />
    <div className="matches-container">
      <h2>Partidos</h2>
      <p>Aquí puedes ver los partidos programados.</p>
      <div className = "matches-button-container">
        <button onClick={updateList}>Actualizar Partidos</button>
        <button className = "matches-add-match" onClick={handleAddMatch}>Agregar Partido</button>
      </div>
      <div className="matches-list">
        {matches.length === 0 ? (
          <p>No hay partidos disponibles. Haz clic en "Actualizar Partidos".</p>
        ) : (
          matches.map((item) => (
            <MatchCard 
              key = {item.match_id}
              time = {item.hora}
              date = {item.fecha}
              localTeam = "San Esteban"
              rivalTeam = {item.rival}
              category = {item.category.gender + " " + item.category.year}
              fieldAddress = {item.cancha.address}
            />
          ))
        )}
      </div>

    </div>
    <AddMatchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
    
  );
}

export default AdminMatchesPage;