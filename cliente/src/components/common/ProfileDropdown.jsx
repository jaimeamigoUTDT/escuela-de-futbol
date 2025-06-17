import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown, Plus } from "lucide-react";
import "./profileDropdown.css";
import logoutController from "../../controllers/logoutController";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { userController } from "../../controllers/userController";

function ProfileDropdown({ isOpen, onToggle }) {
  const navigate = useNavigate();

  const { logoutUser } = logoutController();
  const { updateUserRole} = userController();
  const { userName, userRole } = useAuth();

  // Modal state for adding a coach
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dni, setDni] = useState("");

  const handleAddCoach = () => {
    setIsModalOpen(true);
    onToggle(); // Optionally close dropdown
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDni("");
  };

  const handleModalConfirm = () => {
    // Here, call your controller to add coach by dni
    // e.g. await coachController.addCoach(dni)
    updateUserRole(dni, "admin");
    
    handleModalClose();
  };

  const handleLogout = () => {
    logoutUser();
    onToggle();
    navigate("/login");
  };

  return (
    <div className="profile-section">
      <button className="profile-button" onClick={onToggle}>
        <div className="profile-avatar">
          <span>{userName && userName[0]}</span>
        </div>
        <span className="profile-name">{userName}</span>
        <ChevronDown
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          size={12}
        />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="profile-dropdown">
          {userRole === "superAdmin" && (
            <button className="dropdown-item" onClick={handleAddCoach}>
              <Plus size={16}/>
              Agregar un entrenador
            </button>
          )}
          <button className="dropdown-item logout" onClick={handleLogout}>
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Modal for adding a coach */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Agregar entrenador</h3>
            <input
              type="text"
              value={dni}
              onChange={e => setDni(e.target.value)}
              placeholder="Ingrese el DNI del entrenador"
              className="dni-input"
              style={{marginBottom: 16, width: "100%"}}
            />
            <div className="modal-buttons">
              <button onClick={handleModalClose} className="cancel-button">
                Cancelar
              </button>
              <button
                onClick={handleModalConfirm}
                className="confirm-button"
                disabled={!dni.trim()}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ProfileDropdown;