import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NotificationsContent.css";
import notificationController from "../../../controllers/notificationController";

function NotificationsContent() {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await notificationController.getNotifications();
      if (result.success) {
        setNotifications(result.data);
      }
    };
    fetchNotifications();
  }, []);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleConfirm = async () => {
    const notification_id = uuidv4();
    const fecha = new Date().toISOString().split("T")[0];
    const hora = new Date().toLocaleTimeString().slice(0, 5);
    const match_id = "none";

    

    const result = await notificationController.createNotification(
      notification_id,
      match_id,
      fecha,
      hora,
      content
    );

    if (result && result.success) {
      const updated = await notificationController.getNotifications();
      
      if (updated.success) {
        setNotifications(updated.data);
      }
    }

    setContent("");
    setShowInput(false);
  };

  return (
    <div className="notifications-content-card">
      <div className="header">
        <h1>Notificaciones</h1>
        <button className="add-button" onClick={handleAddClick}>
          <span>+</span>
        </button>
      </div>

      {!showInput && <p>Revisá tus últimas notificaciones:</p>}

      {showInput && (
        <div className="input-group">
          <input
            type="text"
            className="content-input"
            placeholder="Escribí el texto de la notificación"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      )}

      <ul className="notification-list">
        {notifications.map((n) => (
          <li key={n.notification_id} className="notification-item">
            <strong>{n.fecha} {n.hora}</strong>: {n.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsContent;
