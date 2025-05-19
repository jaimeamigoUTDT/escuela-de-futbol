const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

router.post('/', matchController.createMatch);
router.get('/', matchController.getMatches);
router.put('/', matchController.updateMatch);
router.delete('/', matchController.deleteMatch);

module.exports = router;