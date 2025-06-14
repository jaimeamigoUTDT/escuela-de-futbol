const resultService = require('../services/result.service');
const { Result } = require('../models/result.model');

function createResult(req, res) {

    try {
    
        const newResultData = req.body;
        console.log('New Result Data:', newResultData);

        if (newResultData.match_id === undefined){
            return res.status(400).send({ message: 'match_id is missing' });
        } else if (newResultData.result_id === undefined){
            return res.status(400).send({ message: 'result_id is missing' });
        } else if (newResultData.resultado_san_esteban === undefined){
            return res.status(400).send({ message: 'Resultado San Esteban is missing' });
        } else if (newResultData.resultado_rival === undefined){
            return res.status(400).send({ message: 'Resultado Rival is missing' });
        }

        const resultData = resultService.createResult(newResultData);

        res.status(201).send({ message: 'Reuslt created', data: resultData });

    } catch(e){
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
    
}

function getResults(req, res) {
    try {
        
        queryParameters = {};
    
        // Check if req.body exists
        if (req.body) {
          queryParameters = req.body;
        }
        const data = resultService.getResults(queryParameters)
    
        res.status(200).send({ message: 'List of results', data: data});
    
      } catch (error) {
        console.log(error); // Pass errors to error middleware
        res.status(500).send({ message: 'Internal Server Error', data: {} });
      }
}

function updateResult(req, res) {
    try {

        const updateResultData = req.body;

        if (updateResultData.match_id === undefined){
            return res.status(400).send({ message: 'match_id is missing' });
        } else if (updateResultData.result_id === undefined){
            return res.status(400).send({ message: 'result_id is missing' });
        } else if (updateResultData.resultado_san_esteban === undefined){
            return res.status(400).send({ message: 'Resultado San Esteban is missing' });
        } else if (updateResultData.resultado_rival === undefined){
            return res.status(400).send({ message: 'Resultado Rival is missing' });
        }

        const updateResult = resultService.updateResult(updateResultData);

        if (!updateResult) {
            return res.status(400).send({ message: 'Result not found' });
        }

        res.status(201).send({ message: 'Result updated', data: updateResult });


    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

function deleteResult(req, res) {
    
    try {
        const result_id = req.body.result_id;

        if (!result_id) {
            return res.status(400).send({ message: 'result_id is missing' });
        }

        const deletedResult = resultService.deleteResult(result_id);

        if (!deletedResult) {
            return res.status(400).send({ message: 'Result not found' });
        }

        res.status(201).send({ message: 'Result deleted' });

    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

module.exports = {createResult, getResults, updateResult, deleteResult};