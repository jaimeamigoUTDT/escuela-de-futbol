import { Calendar, Clock } from "lucide-react";
import "./NotificationCard.css";

function NotificationCard({ fecha, hora, content, type = "info" }) {
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
        </span>
      </div>
      <div className="notification-card__content">{content}</div>
    </div>
  );
}

export default NotificationCard;