import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

const categoryService = {
    
    getCategories: async (params) => {
        try {
            
            const response = await axios.get(API_URL, { params });
            
            console.log('Fetched categories:', response.data); // Log for debugging
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};

export default categoryService;