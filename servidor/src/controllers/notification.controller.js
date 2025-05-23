function createNotification(req, res) {
    res.status(201).send({ message: 'Notification created' });
}

function getNotifications(req, res) {
    res.status(200).send({ message: 'List of notifications' });
}

function updateNotification(req, res) {
    res.status(201).send({ message: 'Notification updated' });
}

function deleteNotification(req, res) {
    res.status(201).send({ message: 'Notification deleted' });
}

module.exports = { createNotification, getNotifications, updateNotification, deleteNotification };