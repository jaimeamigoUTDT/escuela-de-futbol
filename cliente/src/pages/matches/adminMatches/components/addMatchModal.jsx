import { useState, useEffect } from "react";
import { useMatches } from "../../../../context/MatchesContext";
import { useCanchas, CanchasProvider } from "../../../../context/CanchasContext";
import { canchasController } from "../../../../controllers/canchasController";
import { matchesController } from "../../../../controllers/matchesController";
import notificationController from "../../../../controllers/notificationController";
import { v4 as uuidv4 } from 'uuid';
import "./addMatchModal.css";

const AddMatchModal = ({ isOpen, onClose }) => {
  const { saveMatch } = useMatches();
  const { canchas } = useCanchas();
  const { fetchCanchas } = canchasController();
  const { createMatch } = matchesController();

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

      await createMatch(matchData);

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
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Fecha *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Hora *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
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
                {canchasLoading ? (
                  <p>Cargando canchas...</p>
                ) : (
                  <select
                    id="cancha_id"
                    name="cancha_id"
                    value={formData.cancha_id}
                    onChange={handleInputChange}
                    required
                    disabled={!canchas.length}
                  >
                    <option value="">Seleccionar cancha</option>
                    {canchas.map((cancha) => (
                      <option key={cancha.id} value={cancha.id}>
                        {cancha.name} ({cancha.size} jugadores)
                      </option>
                    ))}
                  </select>
                )}
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

export default AddMatchModal;