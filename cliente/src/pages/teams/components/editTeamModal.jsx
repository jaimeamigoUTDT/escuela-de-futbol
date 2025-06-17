import { useState, useEffect } from "react"
import "./editTeamModal.css"
import {matchesController} from "../../../controllers/matchesController"
import { categoriesController } from "../../../controllers/categoriesController"

const EditTeamModal = ({ isOpen, onClose, team, onSave }) => {
  const [editingTeam, setEditingTeam] = useState(null)
  const [availableMatches, setAvailableMatches] = useState([])
  const [isLoadingMatches, setIsLoadingMatches] = useState(false)
  const [showMatchDropdown, setShowMatchDropdown] = useState(false)
  const [availableCategories, setAvailableCategories] = useState([])
  const [isLoadingCategoriess, setIsLoadingCategories] = useState(false)

  const { getMatches } = matchesController();
  const { getCategories } = categoriesController();

  useEffect(() => {
    if (team) {
      setEditingTeam({ ...team })
    }
  }, [team])

  useEffect(() => {
      loadAvailableMatches()
  }, [showMatchDropdown])
  
  useEffect(() => {
    if (isOpen) {
      loadAvailableCategories();
    }
  }, [isOpen]);

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
  
  const loadAvailableCategories = async () => {
    setIsLoadingCategories(true)
    try {
      const categories = await getCategories();

      setAvailableCategories(categories || [])
      
    } catch (error) {
      console.error("Error loading categories:", error)
      setAvailableCategories([])
    } finally {
      setIsLoadingCategories(false)
    }
  }

  if (!isOpen || !editingTeam) return null

  const handleSaveTeam = (e) => {
    e.preventDefault();

    const cleanedTeam = {
      ...editingTeam,
      category_id: editingTeam.category?.category_id || editingTeam.category_id,
    };

    onSave(cleanedTeam);
    onClose();
  };


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
  
  const handleAssignCategory = (selectedCategoryId) => {
    const selectedCategory = availableCategories.find(
      (c) => c.category_id === parseInt(selectedCategoryId)
    );
    if (selectedCategory) {
      setEditingTeam((prev) => ({
        ...prev,
        category_id: selectedCategory.category_id, // ← Esto es clave
        category: {
          category_id: selectedCategory.category_id,
          year: selectedCategory.year,
          gender: selectedCategory.gender,
        },
      }));
    }
  };

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
            <div className="form-group">
              <label>Categoría:</label>
              <select
                value={editingTeam.category?.category_id || ""}
                onChange={(e) => handleAssignCategory(e.target.value)}
                required
              >
                <option value="">Seleccionar categoría</option>
                {availableCategories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.gender} - {category.year}
                  </option>
                ))}
              </select>
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
