import "./MatchCard.css"
import { Calendar, Clock, MapPin, Users, Bell } from "lucide-react"
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx"
import { v4 as uuidv4 } from "uuid"
import notificationController from "../../controllers/notificationController.jsx"

export default function MatchCard({ time, date, localTeam, rivalTeam, category, fieldAddress, matchData }) {
  const { userRole } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const handleCreateNotification = () => {
    setNotificationContent("");
    setShowModal(true);
  };
  const handleConfirmNotification = async () => {
    if (!notificationContent.trim()) return;

    try {
      await notificationController.createNotification(
        uuidv4(),
        "none",
        new Date().toISOString().split("T")[0],
        new Date().toLocaleTimeString().slice(0, 5),
        `Partido contra ${rivalTeam} el ${date} a las ${time}:\n${notificationContent}`
      );
      alert("Notificación enviada correctamente.");
      setShowModal(false);
    } catch (error) {
      console.error("Error al crear la notificación:", error);
      alert("Hubo un error al enviar la notificación.");
    }
  };


  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Crear notificación</h3>
            <textarea
              rows="4"
              placeholder="Escribí el contenido adicional..."
              value={notificationContent}
              onChange={(e) => setNotificationContent(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={handleConfirmNotification}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
      <div className="match-card">
        <div className="match-card-header">
          <div className="match-title">
            <span className="teams">
              {localTeam} vs {rivalTeam}
            </span>

            {userRole !== "parent" && (
              <button className="bell-button" onClick={handleCreateNotification} title="Crear notificación">
                <Bell className="bell-icon" />
              </button>
            )}
          </div>
        </div>
        <div className="match-card-content">
          <div className="content-left">
            <div className="match-detail">
              <Calendar className="icon" />
              <span>{date}</span>
            </div>
            <div className="match-detail">
              <Clock className="icon" />
              <span>{time}</span>
            </div>
          </div>
          <div className="content-right">
            <div className="match-detail">
              <MapPin className="icon" />
              <span>{fieldAddress}</span>
            </div>
            <div className="match-detail">
              <Users className="icon" />
              <span>{category}</span>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}