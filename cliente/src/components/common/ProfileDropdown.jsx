import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import "./profileDropdown.css";
import logoutController from "../../controllers/logoutController"; // Assuming you have a logout controller

function ProfileDropdown({ isOpen, onToggle }) {
  const navigate = useNavigate();

  const { logoutUser } = logoutController();

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    onToggle(); // Close dropdown
    navigate("/perfil"); // Navigate to profile page
  };

  const handleLogout = () => {
    logoutUser();
    onToggle(); // Close dropdown
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="profile-section">
      <button className="profile-button" onClick={onToggle}>
        <div className="profile-avatar">
          <span>U</span>
        </div>
        <span className="profile-name">Usuario</span>
        <ChevronDown
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          size={12}
        />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="profile-dropdown">
          <button className="dropdown-item" onClick={handleEditProfile}>
            <User size={16} />
            Editar Perfil
          </button>
          <button className="dropdown-item logout" onClick={handleLogout}>
            <LogOut size={16} />
            Cerrar Sesión
          </button>
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