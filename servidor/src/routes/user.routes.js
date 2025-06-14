const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post('/login', loginController.authenticateUser);
router.post('/register', loginController.createUser);
router.put('/update-user', loginController.updateUserRole);


module.exports = router;