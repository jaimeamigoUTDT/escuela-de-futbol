import React, { createContext, useState, useContext } from 'react';

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {

    const [teams, setTeams] = useState([]);

    const saveTeam = (team) => {
        setTeams((prevTeams) => [...prevTeams, team]);
    }

    const deleteTeam = (teamId) => {
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
    };

    const getStoredTeams = () => {
        const storedTeams = localStorage.getItem('teams');
        return storedTeams ? JSON.parse(storedTeams) : [];
    }

    return (
        <TeamsContext.Provider value={{teams, saveTeam, deleteTeam, getStoredTeams}}>
            {children}
        </TeamsContext.Provider>
    );
};

export const useTeams = () => useContext(TeamsContext);