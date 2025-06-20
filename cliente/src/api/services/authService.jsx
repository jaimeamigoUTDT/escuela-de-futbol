import axios from "axios";
import api from "../axios";

const API_URL = "https://escuela-de-futbol.onrender.com/api/users"; // Replace with your backend URL

const authService = {
  // Validate user credentials
  login: async (userData) => {
    try {
      // Send userData directly, not wrapped in {userData}
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data; // Return token or user data
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Create a new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // Return created user data
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // This request should be authenticated
  updateUserRole: async (userId, newRole) => {
    try {
      // Use your authenticated api instance
      const response = await api.put(`${API_URL}/update-user`, { userId, newRole });
      return response.data; // Return updated user data
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default authService;