import { useState, useEffect } from "react";
import { matchesController } from "../../../controllers/matchesController";
import { resultsController } from "../../../controllers/resultsController";
import { v4 as uuidv4 } from "uuid";
import "./AddResultModal.css";
import { all } from "axios";

const AddResultModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    match_id: "",
    resultado_san_esteban: "",
    resultado_rival: "",
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const { getMatches } = matchesController();
  const { getResults, createResult } = resultsController();

  useEffect(() => {
    if (!isOpen) return;

    // Reset form data when modal opens
    setFormData({
      match_id: "",
      resultado_san_esteban: "",
      resultado_rival: "",
    });

    const fetchPastMatches = async () => {
      try {
        const allMatches = await getMatches();
        const allResults = await getResults();
        console.log('allMatches', allMatches);
        
        const pastMatches = allMatches.filter((m) => m.fecha < today);

        // Filtrar partidos que ya tienen un resultado
        const matchesWithoutResults = pastMatches.filter(
          (match) => !allResults.some((result) => result.match_id === match.match_id)
        );

        setMatches(matchesWithoutResults);
      } catch (error) {
        console.error("Error al cargar los partidos:", error);
      }
    };

    fetchPastMatches();
  }, [isOpen]);

  const handleChange = (e) => {
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
      const resultData = {
        result_id: uuidv4(),
        match_id: Number(formData.match_id),
        resultado_san_esteban: parseInt(formData.resultado_san_esteban),
        resultado_rival: parseInt(formData.resultado_rival),
      };

      await createResult(resultData);
      alert("Resultado cargado correctamente.");
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error creando resultado:", error);
      alert("Error al cargar el resultado.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Cargar Resultado</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Partido *</label>
            <select
              name="match_id"
              value={formData.match_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná un partido</option>
              {matches.map((match) => (
                <option key={match.match_id} value={match.match_id}>
                  {`San Esteban vs ${match.rival} - ${match.fecha}`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Puntaje San Esteban *</label>
            <input
              type="number"
              name="resultado_san_esteban"
              value={formData.resultado_san_esteban}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Puntaje Rival *</label>
            <input
              type="number"
              name="resultado_rival"
              value={formData.resultado_rival}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Guardar Resultado"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResultModal;
