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

      const response =  notificationService.createNotification({
        "notification_id": notification_id,
        "match_id": match_id,
        "fecha": fecha,
        "hora": hora,
        "content": content
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
};

export default notificationController;
