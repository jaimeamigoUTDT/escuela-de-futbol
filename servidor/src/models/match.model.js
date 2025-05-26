class Match {
    constructor({ match_id, fecha, hora, rival, category_id, cancha_id }) {
      this.match_id = match_id;
      this.fecha = fecha;
      this.hora = hora;
      this.rival = rival;
      this.category_id = category_id;
      this.cancha_id = cancha_id;
    }
  }

module.exports = { Match };