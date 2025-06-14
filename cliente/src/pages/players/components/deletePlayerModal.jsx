import { useState } from "react"
import "../Players.css"
import "./AddPlayerModal.css"
import playersController from "../../../controllers/playersController"

const DeletePlayerModal = ({ isOpen, onClose, player }) => {
  const { deletePlayer } = playersController()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      console.log("Deleting player with DNI:", player.dni)
      await deletePlayer(player.dni)
      onClose()
    } catch (error) {
      console.error("Error deleting player:", error)
      alert("Error al eliminar el jugador. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Eliminar Jugador</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="player-form">
          <p className="delete-confirmation">
            ¿Estás seguro que deseas eliminar al jugador{" "}
            <strong>
              {player.name} {player.surname}
            </strong>
            ?
          </p>
          <p className="delete-warning">Esta acción no se puede deshacer.</p>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="button" onClick={handleDelete} className="btn-delete" disabled={loading}>
              {loading ? "Eliminando..." : "Eliminar Jugador"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletePlayerModal
