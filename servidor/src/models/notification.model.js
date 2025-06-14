class Notification {
    constructor({ notification_id, match_id, fecha, hora, content }) {
      this.notification_id = notification_id;
      this.match_id = match_id;
      this.fecha = fecha;
      this.hora = hora;
      this.content = content;
    }
  }

module.exports = { Notification };