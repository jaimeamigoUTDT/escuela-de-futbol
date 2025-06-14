import { useState, useEffect } from "react"
import "../Players.css"
import "./AddPlayerModal.css"
import playersController from "../../../controllers/playersController"
import { useAuth } from "../../../hooks/useAuth"

const EditPlayerModal = ({ isOpen, onClose, player }) => {
  const { updatePlayer } = playersController()
  const { userDni } = useAuth() // Get the user's DNI from the auth context
  const [playerOldDni, setPlayerOldDni] = useState() // Initialize userDni state

  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    surname: "",
    date_of_birth: "",
    gender: "",
    parent_dni: Number(userDni),
  })

  const [loading, setLoading] = useState(false)

  // Populate form data when player prop changes
  useEffect(() => {

    if (player) {

      const month = player.date_of_birth?.split("-")[1]
      const day = player.date_of_birth?.split("-")[2]
      const year = player.date_of_birth?.split("-")[0]

      // Format date to YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day}`
      setPlayerOldDni(player.dni)
      setFormData({
        dni: String(player.dni) || "",
        name: player.name || "",
        surname: player.surname || "",
        date_of_birth: formattedDate || "",
        gender: player.gender || "",
        parent_dni: Number(userDni),
      })
    }
  }, [player])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const playerData = {
        dni: Number.parseInt(formData.dni),
        name: formData.name,
        surname: formData.surname,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        parent_dni: Number(userDni),
      }

      console.log("Updating player with data:", playerData)

      await updatePlayer(playerOldDni, playerData)
      onClose()
    } catch (error) {
      console.error("Error updating player:", error)
      alert("Error al actualizar el jugador. Por favor, inténtalo de nuevo.")
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
          <h2>Editar Jugador</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="player-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dni">DNI *</label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Apellido *</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date_of_birth">Fecha de Nacimiento *</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Género *</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Seleccionar género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar Jugador"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPlayerModal
