const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');

router.post('/', teamController.createTeam);
router.get('/', teamController.getTeams);
router.put('/', teamController.updateTeam);
router.delete('/', teamController.deleteTeam);

module.exports = router;