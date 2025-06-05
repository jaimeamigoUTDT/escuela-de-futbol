import React, { createContext, useState, useContext } from 'react';

export const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
    const [matches, setMatches] = useState([
        {
        id: 1,
        time: "16:00",
        date: "2024-03-16",
        localTeam: "Equipo A",
        rivalTeam: "Equipo B",
        category: "Juvenil",
        fieldAddress: "Campo Municipal A",
        },
        {
        id: 2,
        time: "14:00",
        date: "2024-03-17",
        localTeam: "Equipo C",
        rivalTeam: "Equipo D",
        category: "Senior",
        fieldAddress: "Campo Municipal B",
        },
        {
        id: 3,
        time: "14:00",
        date: "2024-03-17",
        localTeam: "Equipo C",
        rivalTeam: "Equipo D",
        category: "Senior",
        fieldAddress: "Campo Municipal B",
        },
        {
        id: 4,
        time: "14:00",
        date: "2024-03-17",
        localTeam: "Equipo C",
        rivalTeam: "Equipo D",
        category: "Senior",
        fieldAddress: "Campo Municipal B",
        },
        {
        id: 5,
        time: "14:00",
        date: "2024-03-17",
        localTeam: "Equipo C",
        rivalTeam: "Equipo D",
        category: "Senior",
        fieldAddress: "Campo Municipal B",
        }
    ]);

    const createMatch = (match) => {
        setMatches((prevMatches) => [...prevMatches, match]);
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
        <MatchesContext.Provider value={{ matches, createMatch, deleteMatch, editMatch }}>
            {children}
        </MatchesContext.Provider>
    );
};

export const useMatches = () => useContext(MatchesContext);