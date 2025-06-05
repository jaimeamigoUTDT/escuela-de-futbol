"use client"

import PropTypes from "prop-types"
import "./mainLayout.css"

function MainLayout({ leftContent, rightContent }) {
  return (
    <main className="main-content">
      {/* Left Section - 70% */}
      <div className="left-section">{leftContent}</div>

      {/* Right Section - 30% */}
      <div className="right-section">{rightContent}</div>
    </main>
  )
}

MainLayout.propTypes = {
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node.isRequired,
}

export default MainLayout
