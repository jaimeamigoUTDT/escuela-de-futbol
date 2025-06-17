import "./MatchCard.css"
import { Calendar, Clock, MapPin, Users, Bell, XCircle, Trash2, Wheat, CircleParking, UtensilsCrossed } from "lucide-react"
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx"
import { v4 as uuidv4 } from "uuid"
import notificationController from "../../controllers/notificationController.jsx"
import { teamsController } from "../../controllers/teamsController.jsx"
import { useAuth } from "../../hooks/useAuth"

export default function MatchCard({
  time,
  date,
  localTeam,
  rivalTeam,
  category,
  fieldAddress,
  match_id,
  cancha,
  team,
  playerDni,
  onConfirmAssistance,
  onDeleteMatch, 
}) {
  const { userRole } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [assistConfirmed, setAssistConfirmed] = useState(false);
  const [assistLoading, setAssistLoading] = useState(false);
  const { editTeam } = teamsController();
  const { userDni } = useAuth();

  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    let foundName = "";
    if (team && Array.isArray(team.players) && playerDni) {
      const playerObj = team.players.find((player) => String(player.dni) === String(playerDni));
      if (playerObj) {
        foundName = `${playerObj.name} ${playerObj.surname}`;
      }
    }
    setPlayerName(foundName);
  }, [team, playerDni]);

  // Detect if player is already confirmed
  useEffect(() => {
    const dniToCheck = playerDni || userDni;
    setAssistConfirmed(
      !!(
        team &&
        Array.isArray(team.confirmed_players_ids) &&
        team.confirmed_players_ids.includes(dniToCheck)
      )
    );
  }, [team, playerDni, userDni]);

  
  const handleCreateNotification = () => {
    setNotificationContent("");
    setShowModal(true);
  };
  const handleConfirmNotification = async () => {
    if (!notificationContent.trim()) return;

    try {
      await notificationController.createNotification(
        uuidv4(),
        match_id,
        new Date().toISOString().split("T")[0],
        new Date().toLocaleTimeString().slice(0, 4),
        `Partido contra ${rivalTeam} el ${date} a las ${time}:\n${notificationContent}`
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error al crear la notificación:", error);
      alert("Hubo un error al enviar la notificación.");
    }
  };

  // Assistance confirmation logic
  const handleConfirmAssistance = async () => {
    setAssistLoading(true);
    try {
      const dniToAdd = playerDni || userDni;

      if (!team || !team.team_id) {
        alert("No se encontró el equipo para este partido.");
        setAssistLoading(false);
        return;
      }

      const confirmed = Array.isArray(team.confirmed_players_ids)
        ? [...team.confirmed_players_ids]
        : [];

      if (!confirmed.includes(dniToAdd)) {
        confirmed.push(dniToAdd);
      } else {
        setAssistLoading(false);
        return;
      }

      await editTeam({
        ...team,
        confirmed_players_ids: confirmed,
      });

      setAssistConfirmed(true);
      if (onConfirmAssistance) onConfirmAssistance();
    } catch (err) {
      console.error("Error al confirmar asistencia:", err);
      alert("Hubo un error al confirmar la asistencia.");
    } finally {
      setAssistLoading(false);
    }
  };

  // Remove assistance confirmation
  const handleRemoveAssistance = async () => {
    setAssistLoading(true);
    try {
      const dniToRemove = playerDni || userDni;

      if (!team || !team.team_id) {
        alert("No se encontró el equipo para este partido.");
        setAssistLoading(false);
        return;
      }

      const confirmed = Array.isArray(team.confirmed_players_ids)
        ? [...team.confirmed_players_ids]
        : [];

      if (confirmed.includes(dniToRemove)) {
        const updated = confirmed.filter(dni => dni !== dniToRemove);
        await editTeam({
          ...team,
          confirmed_players_ids: updated,
        });
        setAssistConfirmed(false);
        if (onConfirmAssistance) onConfirmAssistance();
      }
    } catch (err) {
      console.error("Error al eliminar confirmación:", err);
      alert("Hubo un error al eliminar la confirmación.");
    } finally {
      setAssistLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Crear notificación</h3>
            <textarea
              className="notification-textarea"
              rows="4"
              placeholder="Escribí el contenido adicional..."
              value={notificationContent}
              onChange={(e) => setNotificationContent(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="confirm-button" onClick={handleConfirmNotification}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
      <div className={`match-card${assistConfirmed && userRole === "parent" ? " match-card-confirmed" : ""}`}>
        <div className="match-card-header">
          <div className="match-title">
            <span className="teams">
              {/* Add the name of the player if available */}
              {playerName && (
                <span className="player-to-confirm" style={{fontWeight: 600, marginRight: 8}}>
                  {playerName}:
                </span>
              )}
              {localTeam} vs {rivalTeam}
            </span>
            <div>
              {userRole !== "parent" && (
                <button className="bell-button" onClick={handleCreateNotification} title="Crear notificación">
                  <Bell className="bell-icon" />
                </button>
                
              )}
              {userRole !== "parent" && (
                <button className="delete-button" onClick={onDeleteMatch} title="Eliminar partido">
                  <Trash2 className="trash-icon" />
                </button>
              )}
            </div>
            
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
            <div className="match-detail">
              <Users className="icon" />
              <span>{cancha.size} jugadores</span>
            </div>
            <div className="match-detail">
              <UtensilsCrossed className="icon" />
              <span>Buffet disponible: {cancha.buffet_available === "true" ? "Si" : "No"}</span>
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
            <div className="match-detail">
              <Wheat className="icon" />
              <span>Pasto {cancha.shoe_type}</span>
            </div>
            <div className="match-detail">
              <CircleParking  className="icon" />
              <span>Estacionamiento disponible: {cancha.buffet_available === "true" ? "Si" : "No"}</span>
            </div>
          </div>
        </div>
        {/* Confirm assistance button for parents */}
        {userRole === "parent" && team && playerDni && (
          <div className="confirm-assistance-container">
            {!assistConfirmed ? (
              <button
                className="confirm-assistance-button"
                onClick={handleConfirmAssistance}
                disabled={assistConfirmed || assistLoading}
              >
                {assistLoading ? "Confirmando..." : "Confirmar Asistencia"}
              </button>
            ) : (
              <button
                className="remove-assistance-button"
                onClick={handleRemoveAssistance}
                disabled={assistLoading}
              >
                <XCircle size={18} style={{ marginRight: 4 }} />
                Eliminar confirmación
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}