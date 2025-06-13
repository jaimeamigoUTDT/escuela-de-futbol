import React, { createContext, useState, useContext } from 'react';

export const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    const getStoredResults = () => {
        return results;
    };

    const deleteAllResults = () => {
        setResults([]);
    }

    const saveResult = (result) => {

        // Check if the result already exists
        const existingResult = results.find((r) => r.result_id === result.result_id);

        if (!existingResult) {
            setResults((prevResults) => [...prevResults, result]);
        }

    };

    const deleteResult = (id) => {
        setResults((prevResults) => prevResults.filter((result) => result.result_id !== id));
    };

    const editResult = (id, updatedResult) => {
        setResults((prevResults) =>
            prevResults.map((result) => (result.result_id === id ? updatedResult : result))
        );
    };

    return (
        <ResultsContext.Provider value={{ results, saveResult, deleteResult, editResult, getStoredResults, deleteAllResults }}>
            {children}
        </ResultsContext.Provider>
    );
};

export const useResults = () => useContext(ResultsContext);