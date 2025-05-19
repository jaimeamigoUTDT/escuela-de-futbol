const express = require('express');
const router = express.Router();
const canchaController = require('../controllers/cancha.controller');

router.get('/', canchaController.getCanchas);

module.exports = router;