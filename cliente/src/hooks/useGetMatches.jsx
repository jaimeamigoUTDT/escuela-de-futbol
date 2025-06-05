import { useState, useEffect } from 'react';
import { useMatches } from '../context/MatchesContext';
import matchesController from '../controllers/matchesController';

const useGetMatches = (params) => {
    const [matches, setMatches] = useMatches();
    const [error, setError] = useState(null);

    try {
        const response = matchesController.getMatches(params);
        setMatches(response.data);
    } catch (err) {
        setError(err);
    }

    return { matches, error };
};

export default useGetMatches;