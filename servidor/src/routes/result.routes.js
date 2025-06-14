const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.controller');

router.post('/', resultController.createResult);
router.get('/', resultController.getResults);
router.put('/', resultController.updateResult);
router.delete('/', resultController.deleteResult);

module.exports = router;