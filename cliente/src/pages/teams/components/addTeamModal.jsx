import { useState, useEffect } from "react";
import { teamsController } from "../../../controllers/teamsController";
import { matchesController } from "../../../controllers/matchesController";
import "./addTeamModal.css";

const AddTeamModal = ({ isOpen, onClose, onTeamAdded }) => {
  const { createTeam } = teamsController();
  const { getMatches } = matchesController();

  const [formData, setFormData] = useState({
    teamName: "",
    category_id: "",
    match_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (isOpen) {
      const fetchMatches = async () => {
        try {
          const result = await getMatches();
          setMatches(result || []);
        } catch (error) {
          setMatches([]);
        }
      };
      fetchMatches();
    }
  }, [isOpen, getMatches]);

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
      const teamData = {
        team_id: Date.now(),
        name: formData.teamName,
        category_id: Number.parseInt(formData.category_id),
        match_id: formData.match_id ? Number.parseInt(formData.match_id) : undefined,
        players: [],
      };

      await createTeam(teamData);

      // Reset form
      setFormData({
        teamName: "",
        category_id: "",
        match_id: "",
      });

      // Notify parent to refresh teams list
      if (onTeamAdded) onTeamAdded();

      onClose();
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Error al crear el equipo. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      teamName: "",
      category_id: "",
      match_id: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Agregar Nuevo Equipo</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="team-form">
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
            <label htmlFor="match_id">Asignar a Partido</label>
            <select
              id="match_id"
              name="match_id"
              value={formData.match_id}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar partido</option>
              {matches.map((match) => (
                <option key={match.match_id} value={match.match_id}>
                  {match.fecha} - {match.hora} vs {match.rival}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-btn" disabled={loading}>
              {loading ? "Creando..." : "Crear Equipo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamModal;