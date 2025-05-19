const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.post('/', playerController.createPlayer);
router.get('/', playerController.getPlayers);
router.put('/', playerController.updatePlayer);
router.delete('/', playerController.deletePlayer);

module.exports = router;