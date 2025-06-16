import categoryService from '../api/services/categoryService.jsx';
import {useCategories} from '../context/CategoriesContext.jsx'; // Adjust path as necessary
 
export const categoriesController = () => {

    const {saveCategory} = useCategories();

    const getCategories = async (params) => {

        try {
    
            const fetchedCategories = await categoryService.getCategories(params);

            for (const category of fetchedCategories.data) {
                saveCategory(category);
            }

            const categories = fetchedCategories.data; // Get updated matches from context

            return categories; 

        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    };

    return {
        getCategories
    };
};

