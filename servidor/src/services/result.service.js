const resultRepository = require('../repositories/result.repository');
const matchRepository = require('../repositories/match.repository');
const categoryRepository = require('../repositories/category.repository');

class ResultService {

  enrichResultData(result) {
    if (!result) return null;
    // Fetch related data if necessary

    console.log("result", result)

    if (result.match_id) {
      const match = matchRepository.getMatchById(result.match_id);

      if (match.category_id) {

        const category = categoryRepository.getCategoryById(match.category_id);

        return {
          ...result,
          match: match || null,
          category: category || null
        };
      }
      return {
        ...result,
        match: match || null
      };
    }
    return result;
  }

    createResult(resultData) {

      // Check if the result already exists
      const existingResult = resultRepository.results.find(result => result.result_id === resultData.result_id);
      if (existingResult) {
        return { message: 'Result already exists', data: existingResult};
      }

      const newResult = resultRepository.createResult(resultData);

      if (!newResult) {
        return null;
      }

      return newResult;
    }
  
    getResults(queryParams)  {

      const allResults = resultRepository.getResults();

      const filteredResults = allResults.filter(result => {
        return Object.keys(queryParams).every(key => {
          return result[key] && result[key].toString() === queryParams[key].toString();
        });
      });

      for (let i = 0; i < filteredResults.length; i++) {
        filteredResults[i] = this.enrichResultData(filteredResults[i]);
      }

      return filteredResults;
    }
  
    updateResult(resultData) {

      const existingResult = resultRepository.results.find(result => result.result_id === resultData.result_id);
      
      console.log('Existing Result:', existingResult);

      if (!existingResult) {
        return null;
      }

      const updatedResult = resultRepository.updateResult(resultData.result_id, resultData);

      console.log('Updated Result:', updatedResult);

      const results = resultRepository.getResults();

      return results;
    }
  
    deleteResult(result_id) {

      const deletedResult = resultRepository.deleteResult(result_id);

      if (!deletedResult) {
        return null;
      }

      return deletedResult
    }
  }

  module.exports = new ResultService();