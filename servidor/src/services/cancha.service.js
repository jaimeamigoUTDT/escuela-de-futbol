class CanchaService {
    getCanchas(queryParams) {
      return { message: 'List of canchas', filters: queryParams };
    }
  }

  module.exports = new CanchaService();