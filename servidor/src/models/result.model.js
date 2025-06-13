class Result {
    constructor({ result_id, match_id, resultado_san_esteban, resultado_rival }) {
        this.result_id = result_id;
        this.match_id = match_id;
        this.resultado_san_esteban = resultado_san_esteban;
        this.resultado_rival = resultado_rival;
    }
  }

module.exports = { Result };