const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');

router.post('/', controller.createNotification);
router.get('/', controller.getNotifications);
router.put('/', controller.updateNotification);
router.delete('/', controller.deleteNotification);

module.exports = router;