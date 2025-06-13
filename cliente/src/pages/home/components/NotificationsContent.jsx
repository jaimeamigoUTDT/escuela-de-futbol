import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NotificationsContent.css";
import notificationController from "../../../controllers/notificationController.jsx";
import NotificationCard from "./NotificationCard";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx"; 


function NotificationsContent() {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [notifications, setNotifications] = useState([]);
  const { userRole } = useContext(AuthContext);

  
  const fetchNotifications = async () => {
        const result = await notificationController.getNotifications();
        if (result.success) {
          setNotifications(result.data);
        }
      };

  useEffect(() => {
    
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
  await fetchNotifications(); // 👈 se vuelve a cargar la lista ordenada
  

  setContent("");
  setShowInput(false);
};


  return (
    <div className="notifications-content-card">
      <div className="header">
        <h1>Notificaciones</h1>
        {userRole !== "parent" && (
  <button className="add-button" onClick={handleAddClick}>
    <span className="add-button__icon">+</span>
  </button>
)}
      </div>

      {!showInput && <p>Revisá tus últimas notificaciones:</p>}

      {showInput && (
        <div className="input-group">
            <textarea
              className="content-input"
              placeholder="Escribí el texto de la notificación"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      )}

      <ul className="notification-list">
  {[...notifications]
    .sort((a, b) => {
      const dateA = new Date(`${a.fecha}T${a.hora}`);
      const dateB = new Date(`${b.fecha}T${b.hora}`);
      return dateB - dateA; // más recientes primero
    })
    .map((n) => (
      <NotificationCard
        key={n.notification_id}
        fecha={n.fecha}
        hora={n.hora}
        content={n.content}
      />
    ))}
</ul>
    </div>
  );
}

export default NotificationsContent;
