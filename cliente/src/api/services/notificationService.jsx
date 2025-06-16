import api from '../axios';

const API_URL = 'http://localhost:5000/api/notifications';

const notificationService = {
  // POST /api/notifications
  createNotification: async (notificationData) => {
    const response = await api.post(API_URL, notificationData);
    console.log(response.data);
    return response.data;
  },

  // GET /api/notifications
  getNotifications: async () => {
    const response = await api.get(API_URL);
    console.log(response.data);
    return response.data;
  },

  // PUT /api/notifications
  updateNotification: async (notificationData) => {
    const response = await api.put(API_URL, notificationData);
    return response.data;
  },

  // DELETE /api/notifications
  deleteNotification: async (notification_id) => {
    // For axios.delete with a body, use the 'data' config property
    const response = await api.delete(API_URL, {
      data: { notification_id }
    });
    return response.data;
  }
};

export default notificationService;