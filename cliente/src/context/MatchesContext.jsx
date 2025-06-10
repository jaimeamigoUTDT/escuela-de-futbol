import React, { createContext, useState, useContext } from 'react';
import matchesController from '../controllers/matchesController';

export const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
    const [matches, setMatches] = useState([]);

    

    const createMatch = (match) => {

        setMatches((prevMatches) => [...prevMatches, match]);

        matchesController.createMatch(match);
    };

    const deleteMatch = (id) => {
        setMatches((prevMatches) => prevMatches.filter((match) => match.id !== id));
    };

    const editMatch = (id, updatedMatch) => {
        setMatches((prevMatches) =>
            prevMatches.map((match) => (match.id === id ? updatedMatch : match))
        );
    };

    const updateMatches = async () => {
        console.log('Updating matches...');
    
        try {
            console.log('Fetching matches from the server...');
            const newMatches = await matchesController.getMatches();
            
            // Ensure we have an array before mapping
            if (!Array.isArray(newMatches)) {
                console.error('Expected array but got:', typeof newMatches);
                return;
            }
            
            const formattedMatches = newMatches.map(match => ({
                id: match.match_id,
                time: match.hora,
                date: match.fecha,
                localTeam: "San Esteban",
                rivalTeam: match.rival,
                category: "Juvenil",
                fieldAddress: "Cancha 1"
            }));
    
            setMatches(formattedMatches);
            
        } catch (error) {
            console.log('Error fetching matches:', error);
        }
    }


    return (
        <MatchesContext.Provider value={{ matches, createMatch, deleteMatch, editMatch, updateMatches }}>
            {children}
        </MatchesContext.Provider>
    );
};

export const useMatches = () => useContext(MatchesContext);