class NotificationService {
    createNotification(notificationData) {
      return { message: 'Notification created', data: notificationData };
    }
  
    getNotifications(queryParams) {
      return { message: 'List of notifications', filters: queryParams };
    }
  
    updateNotification(notificationData) {
      return { message: 'Notification updated', data: notificationData };
    }
  
    deleteNotification(notification_id) {
      return { message: 'Notification deleted', notification_id };
    }
  }

module.exports = new NotificationService();