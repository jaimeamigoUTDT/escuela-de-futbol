export function createNotification(req, res) {
    res.status(201).send({ message: 'Notification created' });
}

export function getNotifications(req, res) {
    res.status(200).send({ message: 'List of notifications' });
}

export function updateNotification(req, res) {
    res.status(201).send({ message: 'Notification updated' });
}

export function deleteNotification(req, res) {
    res.status(201).send({ message: 'Notification deleted' });
}