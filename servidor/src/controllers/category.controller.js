const categoryService = require('../services/category.service');

function getCategories(req, res) {

  try {
    // Log request body for debugging
    queryParameters = {};

    // Check if req.body exists
    if (req.body) {
      queryParameters = req.body;
    }

    const data = categoryService.getCategories(queryParameters)

    res.status(200).send({ message: 'List of categories', data: data });

  } catch (error) {
    console.log(error); // Pass errors to error middleware
    res.status(500).send({ message: 'Internal Server Error', data: {} });
  }
  
  
}

module.exports = {getCategories};