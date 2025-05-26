const { Notification } = require('../models/notification.model');

class NotificationRepository {
  notifications = [];

  createNotification(data) {
    const newNotification = new Notification(data);

    this.notifications.push(newNotification);
    
    return newNotification;
  }

  getNotifications() {
    return this.notifications;
  }

  updateNotification(id, updatedData) {
    const index = this.notifications.findIndex(n => n.notitication_id === id);
    if (index === -1) return null;

    this.notifications[index] = { ...this.notifications[index], ...updatedData };
    return this.notifications[index];
  }

  deleteNotification(id) {
    const index = this.notifications.findIndex(n => n.notitication_id === id);
    if (index === -1) return null;

    return this.notifications.splice(index, 1)[0];
  }
}

module.exports = new NotificationRepository();
