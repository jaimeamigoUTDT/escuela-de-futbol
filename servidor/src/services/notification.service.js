const notificationRepository = require('../repositories/notification.repository');

class NotificationService {
  createNotification(data) {
    const exists = notificationRepository.notifications.find(n => n.notification_id === data.notification_id);

    if (exists) {
      return {success: false};
    }
    return notificationRepository.createNotification(data);
  }

  getNotifications(queryParams) {
    const all = notificationRepository.getNotifications();

    delete queryParams.authToken;
    delete queryParams.dni;

    const filtered = all.filter(notification => {
      return Object.keys(queryParams).every(key =>
        notification[key] && notification[key].toString() === queryParams[key].toString()
      );
    });
    return filtered;
  }

  updateNotification(data) {
    const exists = notificationRepository.notifications.find(n => n.notification_id === data.notification_id);
    if (!exists) return null;

    return notificationRepository.updateNotification(data.notification_id, data);
  }

  deleteNotification(id) {
    return notificationRepository.deleteNotification(id);
  }
}

module.exports = new NotificationService();
