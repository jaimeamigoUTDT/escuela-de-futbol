import { useState, useEffect } from "react"
import { useMatches } from "../../../context/MatchesContext"
import "./AddMatchModal.css"

const AddMatchModal = ({ isOpen, onClose }) => {
  const { createMatch } = useMatches()

  const [formData, setFormData] = useState({
    time: "",
    date: "",
    rivalTeam: "",
    category_id: "",
    cancha_id: "",
  })

  const [categories, setCategories] = useState([])
  const [canchas, setCanchas] = useState([])
  const [loading, setLoading] = useState(false)

  // Mock data - replace with actual API calls
  useEffect(() => {
    if (isOpen) {
      // Simulate loading categories and canchas
      setCategories([
        { category_id: 1, year: "2023", gender: "Masculino" },
        { category_id: 2, year: "2023", gender: "Femenino" },
        { category_id: 3, year: "2024", gender: "Masculino" },
        { category_id: 4, year: "2024", gender: "Femenino" },
      ])

      setCanchas([
        { cancha_id: 1, direccion: "Av. San Martín 1234", jugadores: "5" },
        { cancha_id: 2, direccion: "Calle Fútbol 456", jugadores: "7" },
        { cancha_id: 3, direccion: "Pasaje Gol 789", jugadores: "9" },
        { cancha_id: 4, direccion: "Ruta Provincial 21 km 15", jugadores: "11" },
        { cancha_id: 5, direccion: "Av. Libertadores 2020", jugadores: "7" },
      ])
    }
  }, [isOpen])

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
      const matchData = {
        id: Date.now(), // Generate a simple ID
        date: formData.date,
        time: formData.time,
        localTeam: "San Esteban", // Assuming local team is fixed or derived from context
        rivalTeam: formData.rivalTeam,
        category_id: Number.parseInt(formData.category_id),
        cancha_id: Number.parseInt(formData.cancha_id),
      }

      console.log("Creating match with data:", matchData)

      await createMatch(matchData)

      // Reset form
      setFormData({
        date: "",
        time: "",
        rivalTeam: "",
        category_id: "",
        cancha_id: "",
      })

      onClose()
    } catch (error) {
      console.error("Error creating match:", error)
      alert("Error al crear el partido. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      date: "",
      time: "",
      rivalTeam: "",
      category_id: "",
      cancha_id: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Agregar Nuevo Partido</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="match-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Fecha *</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                required />
            </div>

            <div className="form-group">
              <label htmlFor="time">Hora *</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="rivalTeam">Equipo Rival *</label>
            <input
              type="text"
              id="rivalTeam"
              name="rivalTeam"
              value={formData.rivalTeam}
              onChange={handleInputChange}
              placeholder="Nombre del equipo rival"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category_id">Categoría *</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.year} - {category.gender}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cancha_id">Cancha *</label>
              <select id="cancha_id" name="cancha_id" value={formData.cancha_id} onChange={handleInputChange} required>
                <option value="">Seleccionar cancha</option>
                {canchas.map((cancha) => (
                  <option key={cancha.cancha_id} value={cancha.cancha_id}>
                    {cancha.direccion} ({cancha.jugadores} jugadores)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Partido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMatchModal
