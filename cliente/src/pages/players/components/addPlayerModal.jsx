import { useState } from "react";
import { usePlayers } from "../../../context/PlayersContext";
import "./AddPlayerModal.css";

const AddPlayerModal = ({ isOpen, onClose }) => {
  const { createPlayer } = usePlayers();

  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    parent_dni: "",
  });

  const [loading, setLoading] = useState(false);

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
      const playerData = {
        dni: parseInt(formData.dni),
        name: formData.name,
        surname: formData.surname,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        parent_dni: parseInt(formData.parent_dni),
      };

      console.log("Creating player with data:", playerData);

      await createPlayer(playerData);

      setFormData({
        dni: "",
        name: "",
        surname: "",
        dateOfBirth: "",
        gender: "",
        parent_dni: "",
      });

      onClose();
    } catch (error) {
      console.error("Error creating player:", error);
      alert("Error al crear el jugador. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      dni: "",
      name: "",
      surname: "",
      dateOfBirth: "",
      gender: "",
      parent_dni: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Agregar Nuevo Jugador</h2>
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

            <div className="form-group">
              <label htmlFor="parent_dni">DNI del Padre/Madre *</label>
              <input
                type="text"
                id="parent_dni"
                name="parent_dni"
                value={formData.parent_dni}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
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
            <label htmlFor="dateOfBirth">Fecha de Nacimiento *</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Género *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
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
              {loading ? "Creando..." : "Crear Jugador"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayerModal;
