import axios from 'axios';

const API_URL = 'http://localhost:5000/api/canchas';

const canchasService = {

    getCanchas: async (params = {}) => {
        try {
          const response = (await axios.get(API_URL, { params })).data;
          
          console.log("Response from canchasService:", response.data); // Debugging
          console.log(response.success);
          if (!response.success) {
            throw new Error(`Error. Status: ${response.success}`);
          }
      
          return response;

        } catch (error) {
          console.error('Error in canchasService:', error);
          throw error; // Let the controller handle the error
        }
      }
}

export default canchasService;