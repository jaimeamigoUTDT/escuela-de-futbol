const { Cancha } = require('../models/cancha.model.js');

class canchaRepository {

    canchas = [
        new Cancha(1, "Av. San Martín 1234", "5", "sintético", true, false),
        new Cancha(2, "Calle Fútbol 456", "7", "natural", false, true),
        new Cancha(3, "Pasaje Gol 789", "9", "sintético", true, true),
        new Cancha(4, "Ruta Provincial 21 km 15", "11", "natural", false, false),
        new Cancha(5, "Av. Libertadores 2020", "7", "sintético", true, true)
    ]

    getCanchas() {
        return this.canchas;
    }
}

module.exports = new canchaRepository();