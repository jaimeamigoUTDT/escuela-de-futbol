const express = require('express');
const router = express.Router();
const { createUser, authenticateUser } = require('../controllers/user.controller');

router.post('/login', authenticateUser);
router.post('/register', createUser);


module.exports = router;