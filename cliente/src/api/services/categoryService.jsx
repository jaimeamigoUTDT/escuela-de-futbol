import api from "../axios"; // Import your custom axios instance

const categoryService = {
  getCategories: async (params) => {
    try {
      const response = await api.get("/categories", { params }); // Use relative path, baseURL is handled by api
      console.log('Fetched categories:', response.data); // Log for debugging
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};

export default categoryService;