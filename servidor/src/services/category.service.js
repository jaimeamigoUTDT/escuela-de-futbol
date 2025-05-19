class CategoryService {
    getCategories(queryParams) {
      return { message: 'List of categories', filters: queryParams };
    }
  }

export default new CategoryService();