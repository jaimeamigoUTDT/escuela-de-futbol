import { useState, useEffect } from "react"
import "./editTeamModal.css"
import {matchesController} from "../../../controllers/matchesController"

const EditTeamModal = ({ isOpen, onClose, team, onSave }) => {
  const [editingTeam, setEditingTeam] = useState(null)
  const [availableMatches, setAvailableMatches] = useState([])
  const [isLoadingMatches, setIsLoadingMatches] = useState(false)
  const [showMatchDropdown, setShowMatchDropdown] = useState(false)

  const { getMatches } = matchesController();

  useEffect(() => {
    if (team) {
      setEditingTeam({ ...team })
    }
  }, [team])

  useEffect(() => {
      loadAvailableMatches()
  }, [showMatchDropdown])

  const loadAvailableMatches = async () => {
    setIsLoadingMatches(true)
    try {
      const matches = await getMatches();

      setAvailableMatches(matches || [])
      
    } catch (error) {
      console.error("Error loading matches:", error)
      setAvailableMatches([])
    } finally {
      setIsLoadingMatches(false)
    }
  }

  if (!isOpen || !editingTeam) return null

  const handleSaveTeam = (e) => {
    e.preventDefault()
    onSave(editingTeam)
    onClose()
  }

  const handleInputChange = (field, value) => {
    setEditingTeam((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent, field, value) => {
    setEditingTeam((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }))
  }

  const handleAssignMatch = (selectedMatch) => {
    setEditingTeam((prev) => ({
      ...prev,
      match: {
        rival: selectedMatch.rival || "",
        fecha: selectedMatch.fecha || "",
        hora: selectedMatch.hora || "",
        cancha: selectedMatch.cancha || { address: "" },
        match_id: selectedMatch.match_id,
      },
    }))

    setShowMatchDropdown(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Editar Equipo</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSaveTeam} className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label>Género:</label>
                <input
                  type="text"
                  value={editingTeam.category?.gender || ""}
                  onChange={(e) => handleNestedInputChange("category", "gender", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Año:</label>
                <input
                  type="text"
                  value={editingTeam.category?.year || ""}
                  onChange={(e) => handleNestedInputChange("category", "year", e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nombre del Equipo:</label>
              <input
                type="text"
                value={editingTeam.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="match-section">
              <div className="match-header">
                <h4>Información del Partido</h4>
                <div className="assign-match-container">
                  <button
                    type="button"
                    className="assign-match-button"
                    onClick={() => setShowMatchDropdown(!showMatchDropdown)}
                    disabled={isLoadingMatches}
                  >
                    {isLoadingMatches ? "Cargando..." : "Asignar a otro partido"}
                    <span className={`dropdown-arrow ${showMatchDropdown ? "open" : ""}`}>▼</span>
                  </button>

                  {showMatchDropdown && (
                    <div className="matches-dropdown">
                      {availableMatches.length > 0 ? (
                        availableMatches.map((match) => (
                          <div key={match.match_id} className="match-option" onClick={() => handleAssignMatch(match)}>
                            <div className="match-info">
                              <strong>{match.rival || "Sin rival"}</strong>
                              <span className="match-details">
                                {match.fecha} - {match.hora}
                              </span>
                              <span className="match-location">{match.cancha?.address || "Sin ubicación"}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-matches">No hay partidos disponibles</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rival:</label>
                  <p>{editingTeam.match?.rival || ""}</p>
                </div>
                <div className="form-group">
                  <label>Fecha:</label>
                  <p>{editingTeam.match?.fecha || ""}</p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hora:</label>
                  <p>{editingTeam.match?.hora || ""}</p>
                </div>
                <div className="form-group">
                  <label>Dirección de la Cancha:</label>
                  <p>{editingTeam.match?.cancha?.address || ""}</p>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="save-button">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTeamModal
