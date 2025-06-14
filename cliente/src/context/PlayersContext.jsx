import React, { createContext, useState, useContext } from 'react';

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);

    const createPlayer = (player) => {
        setPlayers((prevPlayers) => [...prevPlayers, player]);
    };

    const deletePlayer = (dni) => {
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player.dni !== dni));
    };

    const editPlayer = (dni, updatedPlayer) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) => (player.dni === dni ? updatedPlayer : player))
        );
    };

    const updatePlayers = async (newPlayers) => {
        try {

            // Ensure we have an array before mapping
            if (!Array.isArray(newPlayers)) {
                return;
            }
            
            const formattedPlayers = newPlayers.map(player => ({
                dni: player.dni,
                name: player.name,
                surname: player.surname,
                dateOfBirth: player.date_of_birth,
                gender: player.gender,
                parentDni: player.parent_dni,
                parent: player.parent ? {
                    dni: player.parent.dni,
                    name: player.parent.name,
                } : null,
            }));
    
            setPlayers(formattedPlayers);
            
        } catch (error) {
            console.log('Error fetching players:', error);
        }
    }


    return (
        <PlayersContext.Provider value={{ players, createPlayer, deletePlayer, editPlayer, updatePlayers }}>
            {children}
        </PlayersContext.Provider>
    );
};

export const usePlayers = () => useContext(PlayersContext);