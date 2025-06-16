const categoryRepository = require('../repositories/category.repository');

class CategoryService {
  createCategory(categoryData) {

    // Check if the category already exists
    const existingCategory = categoryRepository.categories.find(category => category.category_id === categoryData.category_id);
    if (existingCategory) {
      return { message: 'Category already exists', data: existingCategory};
    }

    const newCategory = categoryRepository.createCategory(categoryData);

    if (!newCategory) {
      return null;
    }

    return newCategory;
  }

  getCategories(queryParams)  {

    const allCategories = categoryRepository.getCategories();

    delete queryParams.authToken;
    delete queryParams.dni;

    const filteredCategories = allCategories.filter(category => {
      return Object.keys(queryParams).every(key => {
        return category[key] && category[key].toString() === queryParams[key].toString();
      });
    });

    return filteredCategories;
  }

  updateCategory(categoryData) {

    const existingCategory = categoryRepository.categories.find(category => category.category_id === categoryData.category_id);
    
    console.log('Existing Category:', existingCategory);

    if (!existingCategory) {
      return null;
    }

    categoryRepository.updateCategory(categoryData.category_id, categoryData);

    console.log('Updated Category:', updatedCategory);

    const categories = categoryRepository.getCategories();

    return categories;
  }

  deleteCategory(category_id) {

    const deletedCategory = categoryRepository.deleteCategory(category_id);

    if (!deletedCategory) {
      return null;
    }

    return deletedCategory
  }
}

module.exports = new CategoryService();