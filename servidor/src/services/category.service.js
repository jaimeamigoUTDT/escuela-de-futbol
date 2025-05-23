class CategoryService {
    getCategories(queryParams) {
      return { message: 'List of categories', filters: queryParams };
    }
  }

  module.exports = new CategoryService();