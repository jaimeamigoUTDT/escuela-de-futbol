import { useCanchas } from '../context/CanchasContext'; // Adjust path
import canchasService from '../api/services/canchasService';
import { formatCanchas } from '../utils/formatCanchas'; // Adjust path

export const canchasController = () => {
  const {saveCanchas, getStoredCanchas} = useCanchas();

  const fetchCanchas = async ({ cancha_id, size, shoe_type, buffet_available, parking_available } = {}) => {
    
    let canchas = getStoredCanchas();
    
    if (canchas.length > 0) {
      return canchas;
    }

    try {
  
      const params = {};

      if (cancha_id !== undefined) params.cancha_id = parseInt(cancha_id, 10);
      if (size) params.size = size;
      if (shoe_type) params.shoe_type = shoe_type;
      if (buffet_available !== undefined) params.buffet_available = buffet_available;
      if (parking_available !== undefined) params.parking_available = parking_available;

      const response = await canchasService.getCanchas(params);

      console.log('Response from canchasService:', response);

      if (!response) {
          console.log('Invalid response:', response);
          saveCanchas([]); // Clear canchas if no data
      } else if (response.length === 0) {
          console.log('No canchas found');
          saveCanchas([]); // Clear canchas if no data
      }

      const canchasData = response;

      const formattedCanchas = formatCanchas(canchasData);

      saveCanchas(formattedCanchas);

      const storedCanchas = getStoredCanchas();
      
      return storedCanchas;
    
    } catch (error) {
      
      console.error('Error fetching canchas:', error);
      
      saveCanchas([]); // Clear canchas on error
      
      return [];
    }

  };

  return { fetchCanchas };
};