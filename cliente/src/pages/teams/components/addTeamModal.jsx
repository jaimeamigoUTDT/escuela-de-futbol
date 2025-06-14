import { useState, useEffect } from "react";
import { useMatches } from "../../../context/MatchesContext";
import { useCanchas, CanchasProvider } from "../../../context/CanchasContext";
import { canchasController } from "../../../controllers/canchasController";
import { matchesController } from "../../../controllers/matchesController";
import notificationController from "../../../controllers/notificationController";
import { v4 as uuidv4 } from 'uuid';
import "./AddTeamModal.css";
import { teamsController } from "../../../controllers/teamsController";

const AddTeamModal = ({ isOpen, onClose }) => {
  const { saveMatch } = useMatches();
  const { canchas } = useCanchas();
  const { fetchCanchas } = canchasController();
  const { createMatch, getMatches } = matchesController();
  const { createTeam } = teamsController();
  const [editingTeam, setEditingTeam] = useState({
    match: {
      rival: "",
      fecha: "",
      hora: "",
      cancha: {
        address: ""
      }
    }
  })
  const [availableMatches, setAvailableMatches] = useState([])
  const [isLoadingMatches, setIsLoadingMatches] = useState(false)
  const [showMatchDropdown, setShowMatchDropdown] = useState(false)

  const [formData, setFormData] = useState({
    time: "",
    date: "",
    rivalTeam: "",
    category_id: "",
    cancha_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canchasLoading, setCanchasLoading] = useState(false);


  // Fetch categories (mocked for now)
  useEffect(() => {
    if (isOpen) {
      setCategories([
        { category_id: 1, year: "2023", gender: "Masculino" },
        { category_id: 2, year: "2023", gender: "Femenino" },
        { category_id: 3, year: "2024", gender: "Masculino" },
        { category_id: 4, year: "2024", gender: "Femenino" },
      ]);
    }
  }, [isOpen]);

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

  // Fetch canchas when modal opens
  useEffect(() => {
    if (isOpen) {
      const loadCanchas = async () => {
        setCanchasLoading(true);
        console.log("Fetching canchas... in view"); // Debugging
        const success = await fetchCanchas(); // Fetch all canchas
        setCanchasLoading(false);
      };
      loadCanchas();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const matchData = {
        id: Date.now(),
        date: formData.date,
        time: formData.time,
        localTeam: "San Esteban",
        rivalTeam: formData.rivalTeam,
        category_id: Number.parseInt(formData.category_id),
        cancha_id: Number.parseInt(formData.cancha_id),
      };

      console.log("Creating match with data:", matchData);

      await saveMatch(matchData);

      await createTeam(matchData);

      await notificationController.createNotification(
        uuidv4(),
        matchData.id,
        new Date().toISOString().split("T")[0],
        new Date().toLocaleTimeString().slice(0, 5),
        "Partido contra " + matchData.rivalTeam + " el " + matchData.date + " a las " + matchData.time
      );

      // Reset form
      setFormData({
        date: "",
        time: "",
        rivalTeam: "",
        category_id: "",
        cancha_id: "",
      });

      onClose();
    } catch (error) {
      console.error("Error creating match:", error);
      alert("Error al crear el partido. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      date: "",
      time: "",
      rivalTeam: "",
      category_id: "",
      cancha_id: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <CanchasProvider>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Agregar Nuevo Partido</h2>
            <button className="modal-close-btn" onClick={handleClose}>
              ×
            </button>
          </div>


          <form onSubmit={handleSubmit} className="match-form">

            <div className="form-group">
              <label htmlFor="teamName">Nombre del equipo</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder="Nombre del equipo"
                required
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
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleClose} className="btn-cancel" disabled={loading}>
                Cancelar
              </button>
              <button type="submit" className="btn-btn" disabled={loading || canchasLoading}>
                {loading ? "Creando..." : "Crear Partido"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </CanchasProvider>
  );
};

export default AddTeamModal;