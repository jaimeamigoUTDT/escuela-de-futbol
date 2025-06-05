"use client"

import { useState } from "react"
import ProfileDropdown from "../common/ProfileDropdown"
import "./navbar.css"

function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleNavClick = (section) => {
    console.log(`Navigating to: ${section}`)
    setIsProfileDropdownOpen(false) // Close dropdown on navigation
    window.location.href = `/${section}`;
    // Add navigation logic here
  }

  const navigationItems = [
    { key: "inicio", label: "Inicio" },
    { key: "partidos", label: "Partidos" },
    { key: "resultados", label: "Resultados" },
    { key: "torneos", label: "Torneos" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-content navbar-content-no-padding">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <h2>Escuela de Fútbol</h2>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          {navigationItems.map((item) => (
            <button key={item.key} className="nav-link" onClick={() => handleNavClick(item.key)}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Profile Section */}
        <ProfileDropdown isOpen={isProfileDropdownOpen} onToggle={toggleProfileDropdown} />
      </div>
    </nav>
  )
}

export default Navbar
