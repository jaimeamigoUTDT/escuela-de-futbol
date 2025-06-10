const notificationService = require('../services/notification.service');

function createNotification(req, res) {
  try {
    console.log('Creating notification with data:', req.body);
    const data = req.body;
    if (!data.notification_id) return res.status(400).send({ message: 'ID is missing' });
    if (!data.match_id) return res.status(400).send({ message: 'Match ID is missing' });
    if (!data.fecha) return res.status(400).send({ message: 'Fecha is missing' });
    if (!data.hora) return res.status(400).send({ message: 'Hora is missing' });
    if (!data.content) return res.status(400).send({ message: 'Content is missing' });

    const result = notificationService.createNotification(data);
    if (result.success === false) {
      return res.status(400).send({ message: 'Notification already exists', data: {} });
    }  else {
    res.status(201).send({ message: 'Notification created', data: result });
    }
  } catch (e) {
    res.status(500).send({ message: `Error ${e}`, data: {} });
  } 
}

function getNotifications(req, res) {
  try {
    const query = req.body || {};
    const data = notificationService.getNotifications(query);
    res.status(200).send({ message: 'List of notifications', data });

  } catch (e) {
    res.status(500).send({ message: `Error ${e}`, data: {} });
  }
}

function updateNotification(req, res) {
  try {
    const data = req.body;

    if (!data.notitication_id) return res.status(400).send({ message: 'ID is missing' });

    const result = notificationService.updateNotification(data);
    if (!result) return res.status(400).send({ message: 'Notification not found' });

    res.status(200).send({ message: 'Notification updated', data: result });

  } catch (e) {
    res.status(500).send({ message: `Error ${e}`, data: {} });
  }
}

function deleteNotification(req, res) {
  try {
    const { notitication_id } = req.body;

    if (!notitication_id) return res.status(400).send({ message: 'ID is missing' });

    const result = notificationService.deleteNotification(notitication_id);
    if (!result) return res.status(400).send({ message: 'Notification not found' });

    res.status(200).send({ message: 'Notification deleted' });

  } catch (e) {
    res.status(500).send({ message: `Error ${e}`, data: {} });
  }
}

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
};
