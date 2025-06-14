import React, { createContext, useState, useContext } from 'react';

export const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
    const [matches, setMatches] = useState([]);

    const getStoredMatches = () => {
        return matches;
    };

    const deleteAllMatches = () => {
        setMatches([]);
    }

    const saveMatch = (match) => {

        // Check if the match already exists
        const existingMatch = matches.find((m) => m.id === match.id);

        if (!existingMatch) {
            setMatches((prevMatches) => [...prevMatches, match]);
        }

        matches.sort((a, b) => {
            // Combine date and time into a single Date object for comparison
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            
            // Handle invalid dates
            if (isNaN(dateTimeA)) return 1; // Push invalid dates to the end
            if (isNaN(dateTimeB)) return -1;
            
            return dateTimeB - dateTimeA; // Sort ascending (earliest first)
        });

    };

    const deleteMatch = (id) => {
        setMatches((prevMatches) => prevMatches.filter((match) => match.id !== id));
    };

    const editMatch = (id, updatedMatch) => {
        setMatches((prevMatches) =>
            prevMatches.map((match) => (match.id === id ? updatedMatch : match))
        );
    };

    return (
        <MatchesContext.Provider value={{ matches, saveMatch, deleteMatch, editMatch, getStoredMatches, deleteAllMatches}}>
            {children}
        </MatchesContext.Provider>
    );
};

export const useMatches = () => useContext(MatchesContext);