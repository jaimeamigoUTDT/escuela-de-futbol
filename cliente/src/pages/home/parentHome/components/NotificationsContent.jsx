import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NotificationsContent.css";
import notificationController from "../../../../controllers/notificationController.jsx";
import NotificationCard from "./NotificationCard.jsx";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import playersController from "../../../../controllers/playersController.jsx";
import { teamsController } from "../../../../controllers/teamsController.jsx";

function NotificationsContent() {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [notifications, setNotifications] = useState([]);
  const { userRole, userDni } = useAuth();
  const [childMatchIds, setChildMatchIds] = useState([]);
  const [childNotifications, setChildNotifications] = useState([]);
  const { getTeamsByChildren } = teamsController();
  const { getChildrenOfParent } = playersController();

  // Fetch notifications for a list of match IDs
  const fetchNotificationsByMatchIds = async (matchIds) => {
    // If you have a controller method to fetch notifications by match_ids, use it.
    // Here we assume notificationController.getNotificationsByMatchIds exists.
    // Otherwise, fallback to fetching all notifications and filter.
    if (notificationController.getNotificationsByMatchIds) {
      const result = await notificationController.getNotificationsByMatchIds(matchIds);
      if (result.success) {
        setChildNotifications(result.data);
      }
    } else {
      // Fallback: fetch all notifications, then filter
      const allResult = await notificationController.getNotifications();
      if (allResult.success) {
        const filtered = allResult.data.filter(n =>
          !n.match_id ||
          n.match_id === "none" ||
          n.match_id === "" ||
          n.match_id === null ||
          matchIds.map(String).includes(String(n.match_id))
        );
        setChildNotifications(filtered);
      }
    }
  };

  // Fetch all notifications (for admin, etc.)
  const fetchNotifications = async () => {
    const result = await notificationController.getNotifications();
    if (result.success) {
      setNotifications(result.data);
    }
  };

  // Fetch match_ids for matches assigned to the children of the current user,
  // then fetch notifications for those matches
  const fetchChildMatchIds = async () => {
    if (userRole !== "parent") {
      setChildMatchIds([]);
      setChildNotifications([]); // Clear specific notifications if not parent
      return;
    }

    const result = await getChildrenOfParent(userDni);

    // Use only the children array for getTeamsByChildren
    const children = result && Array.isArray(result) ? result : result?.data ?? [];

    const teams = await getTeamsByChildren(children);

    // Collect all match_ids from the teams the children participate in
    const matchIdsSet = new Set();
    teams.forEach(team => {
      if (team.match_id) matchIdsSet.add(team.match_id);
    });

    setChildMatchIds([...matchIdsSet]);
    await fetchNotificationsByMatchIds([...matchIdsSet]);
  };

  // On mount and when userRole changes, load notifications and, if parent, load child match ids + notifications
  useEffect(() => {
    if (userRole === "parent") {
      fetchChildMatchIds();
    } else {
      fetchNotifications();
    }
    // eslint-disable-next-line
  }, [userRole]);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleConfirm = async () => {
    const notification_id = uuidv4();
    const fecha = new Date().toISOString().split("T")[0];
    const hora = new Date().toLocaleTimeString().slice(0, 4);
    const match_id = "none";

    const result = await notificationController.createNotification(
      notification_id,
      match_id,
      fecha,
      hora,
      content
    );
    if (userRole === "parent") {
      // Reload relevant notifications for parent after add
      await fetchChildMatchIds();
    } else {
      await fetchNotifications();
    }

    setContent("");
    setShowInput(false);
  };

  // Show only relevant notifications to each user role
  const filteredNotifications = userRole === "parent"
    ? childNotifications
    : notifications;

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
        {[...filteredNotifications]
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
              showDelete={userRole !== "parent"}
              onDelete={async () => {
                await notificationController.deleteNotification(n.notification_id);
                if (userRole === "parent") {
                  await fetchChildMatchIds();
                } else {
                  await fetchNotifications();
                }
              }}
            />
        ))}
      </ul>
    </div>
  );
}

export default NotificationsContent;