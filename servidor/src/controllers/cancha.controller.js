const canchaService = require('../services/cancha.service');

function getCanchas(req, res) {
    try {
        // Log request body for debugging
        console.log('Request body:', req.body);
    
        queryParameters = {};
    
        // Check if req.body exists
        if (req.body) {
          queryParameters = req.body;
        }
    
        const data = canchaService.getCanchas(queryParameters)
    
        res.status(200).send({ message: 'List of canchas', data: data });
    
      } catch (error) {
        console.log(error); // Pass errors to error middleware
        res.status(500).send({ message: 'Internal Server Error', data: {} });
      }
  }
  
module.exports = { getCanchas };