"use client"

import PropTypes from "prop-types"
import "./profileDropdown.css"

function ProfileDropdown({ isOpen, onToggle }) {
  const handleEditProfile = () => {
    console.log("Edit profile clicked")
    onToggle()
    // Add edit profile logic here
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    onToggle()
    // Add logout logic here
  }

  return (
    <div className="profile-section">
      <button className="profile-button" onClick={onToggle}>
        <div className="profile-avatar">
          <span>U</span>
        </div>
        <span className="profile-name">Usuario</span>
        <svg
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="profile-dropdown">
          <button className="dropdown-item" onClick={handleEditProfile}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                fill="currentColor"
              />
              <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor" />
            </svg>
            Editar Perfil
          </button>
          <button className="dropdown-item logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 2H2V14H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 11L13 8L10 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  )
}

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default ProfileDropdown
