import resultService from '../api/services/resultService.jsx';
import {useResults} from '../context/ResultsContext.jsx'; // Adjust path as necessary
 
export const resultsController = () => {

    const { getStoredResults, saveResult, deleteAllResults} = useResults();

    const getResults = async (params = {}) => {

        try {
    
            const fetchedResults = await resultService.getResults(params);

            for (const result of fetchedResults.data) {
                saveResult(result);
            }

            const results = getStoredResults(); // Get updated matches from context

            return results; 

        } catch (error) {
            console.error('Error fetching results:', error);
            throw error;
        }
    };

    const createResult = async (data) => {
        try {

            const formmatedResult = {
                result_id: data.result_id,
                match_id: data.match_id,
                resultado_san_esteban: data.resultado_san_esteban,
                resultado_rival: data.resultado_rival,
            }

            console.log("Creating result with data:", formmatedResult);

            const newResult = await resultService.createResult(formmatedResult);
            return newResult;
        } catch (error) {
            console.error('Error creating result:', error);
            throw error;
        }
    };

    const updateResult = async (id, data) => {
        try {
            const updatedResult = await resultService.updateResult(id, data);
            return updatedResult;
        } catch (error) {
            console.error('Error updating result:', error);
            throw error;
        }
    };

    const deleteResult = async (id) => {
        try {
            const result = await resultService.deleteResult(id);
            return result;
        } catch (error) {
            console.error('Error deleting result:', error);
            throw error;
        }
    };

    return {
        getResults,
        createResult,
        updateResult,
        deleteResult
    };
};

export default resultsController;