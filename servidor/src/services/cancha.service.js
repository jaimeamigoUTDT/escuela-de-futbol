class CanchaService {
    getCanchas(queryParams) {
      return { message: 'List of canchas', filters: queryParams };
    }
  }

export default new CanchaService();