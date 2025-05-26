const canchaRepository = require('../repositories/cancha.repository');

class CanchaService {
  getCanchas(queryParams) {
        
    const allCanchas = canchaRepository.getCanchas();

    console.log('All canchas:', allCanchas);

    const filteredCanchas = allCanchas.filter(cancha => {
      return Object.keys(queryParams).every(key => {
        return cancha[key] && cancha[key].toString() === queryParams[key].toString();
      });
    });

    return { message: 'List of canchas', data: filteredCanchas };
  }
}
  
module.exports = new CanchaService();


