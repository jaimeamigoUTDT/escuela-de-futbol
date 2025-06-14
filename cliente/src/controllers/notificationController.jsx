import notificationService from '../api/services/notificationService';

const notificationController = {
  createNotification: async (
    notification_id,
    match_id,
    fecha,
    hora,
    content
  ) => {
    try {
      console.log('Creando notificación con:', {
        notification_id,
        match_id,
        fecha,
        hora,
        content
      });

      const response = await notificationService.createNotification({
        notification_id,
        match_id,
        fecha,
        hora,
        content
      });

      return {
        success: response.success,
        notification_id: response.notification_id,
      };
    } catch (error) {
      console.error('Error al crear notificación:', error);
      return { success: false };
    }
  },

  getNotifications: async () => {
    try {
      const response = await notificationService.getNotifications();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      return {
        success: false,
        data: [],
      };
    }
  },

  deleteNotification: async (notification_id) => {
    try {
      console.log('Eliminando notificación con ID:', notification_id);
      const response = await notificationService.deleteNotification(notification_id);
      return {
        success: response.success,
      };
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      return { success: false };
    }
  }
};

export default notificationController;