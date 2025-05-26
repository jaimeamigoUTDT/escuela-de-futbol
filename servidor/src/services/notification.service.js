const notificationRepository = require('../repositories/notification.repository');

class NotificationService {
  createNotification(data) {
    const exists = notificationRepository.notifications.find(n => n.notitication_id === data.notitication_id);
    if (exists) {
      return { message: 'Notification already exists', data: exists };
    }

    return notificationRepository.createNotification(data);
  }

  getNotifications(queryParams) {
    const all = notificationRepository.getNotifications();
    const filtered = all.filter(notification => {
      return Object.keys(queryParams).every(key =>
        notification[key] && notification[key].toString() === queryParams[key].toString()
      );
    });
    return filtered;
  }

  updateNotification(data) {
    const exists = notificationRepository.notifications.find(n => n.notitication_id === data.notitication_id);
    if (!exists) return null;

    return notificationRepository.updateNotification(data.notitication_id, data);
  }

  deleteNotification(id) {
    return notificationRepository.deleteNotification(id);
  }
}

module.exports = new NotificationService();
