const categoryRepository = require('../repositories/category.repository');

class CategoryService {
    getCategories(queryParams) {
      
      const allCategories = categoryRepository.getCategories();

      console.log('All categories:', allCategories);

      const filteredCategories = allCategories.filter(category => {
        return Object.keys(queryParams).every(key => {
          return category[key] && category[key].toString() === queryParams[key].toString();
        });
      });

      return { message: 'List of categories', data: filteredCategories };
    }
  }

  module.exports = new CategoryService();