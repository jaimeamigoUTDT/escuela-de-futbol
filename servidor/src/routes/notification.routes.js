const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getNotifications);
router.put('/', notificationController.updateNotification);
router.delete('/', notificationController.deleteNotification);

module.exports = router;