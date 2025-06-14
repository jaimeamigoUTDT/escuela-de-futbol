import "./NotificationCard.css";
import { Calendar, Clock, Trash2 } from "lucide-react"; // agregamos ícono de tacho (opcional)

function NotificationCard({ fecha, hora, content, type = "info", showDelete = false, onDelete }) {
  return (
    <div className={`notification-card notification-card--${type}`}>
      <div className="notification-card__header">
        <span className="notification-card__date">
          <Calendar size={16} className="notification-card__icon" />
          {fecha}
        </span>
        <span className="notification-card__time">
          <Clock size={16} className="notification-card__icon" />
          {hora}
          {showDelete && (
            <button
              className="notification-card delete-button"
              onClick={onDelete}
              title="Eliminar notificación"
            >
              <Trash2 size={16} />
            </button>
          )}
        </span>
      </div>
      <div className="notification-card__content">{content}</div>
    </div>
  );
}

export default NotificationCard;
