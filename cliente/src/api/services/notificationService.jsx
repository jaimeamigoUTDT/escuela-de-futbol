import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notifications';

const notificationService = {
  // POST /api/notifications
  createNotification: async (notificationData) => {
    
    var response = await axios.post(API_URL, notificationData).then(res => res.data);
    console.log(response);
    return response;
  },

  // GET /api/notifications
  getNotifications: async () => {
    
    var response = await axios.get(API_URL).then(res => res.data);
    console.log(response.data);
    return response;
  },

  // PUT /api/notifications
  updateNotification: async (notificationData) => {
    return axios.put(API_URL, notificationData).then(res => res.data);
  },

  // DELETE /api/notifications
deleteNotification: async (notification_id) => {
  return axios.delete(API_URL, {
    data: { notification_id }
  }).then(res => res.data);
}
};

export default notificationService;
