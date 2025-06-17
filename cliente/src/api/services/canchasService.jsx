import api from "../axios";

const API_URL = "https://escuela-de-futbol.onrender.com/api/canchas";

const canchasService = {
  getCanchas: async (params = {}) => {
    try {
      const response = await api.get(API_URL, { params });
      // Backend returns: { success, message, data }
      const { success, data } = response.data;

      if (!success) {
        throw new Error(`Error. Status: ${success}`);
      }

      return data; // Return just the array of canchas
    } catch (error) {
      console.error("Error in canchasService:", error);
      throw error; // Let the controller handle the error
    }
  }
};

export default canchasService;