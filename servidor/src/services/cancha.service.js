const canchaRepository = require('../repositories/cancha.repository');

class CanchaService {
  getCanchas(queryParams) {
        
    const allCanchas = canchaRepository.getCanchas();

    delete queryParams.authToken;
    delete queryParams.dni;

    const filteredCanchas = allCanchas.filter(cancha => {
      return Object.keys(queryParams).every(key => {
        return cancha[key] && cancha[key].toString() === queryParams[key].toString();
      });
    });

    return filteredCanchas;
  }
}
  
module.exports = new CanchaService();


