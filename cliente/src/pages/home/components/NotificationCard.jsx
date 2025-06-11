import { Calendar, Clock } from "lucide-react";
import "./NotificationCard.css";

function NotificationCard({ fecha, hora, content }) {
  return (
    <div className="notification-card">
      <div className="notification-header">
        <span className="notification-date">
          <Calendar size={16} style={{ marginRight: "6px" }} />
          {fecha}
        </span>
        <span className="notification-time">
          <Clock size={16} style={{ marginRight: "6px" }} />
          {hora}
        </span>
      </div>
      <div className="notification-content">{content}</div>
    </div>
  );
}

export default NotificationCard;
