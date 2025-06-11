import PropTypes from "prop-types"
import "./mainLayout.css"

function MainLayout({ leftContent, rightContent }) {
  return (
    <main className="main-content">
      <div className="left-section">{leftContent}</div>
      <div className="right-section">{rightContent}</div>
    </main>
  )
}

MainLayout.propTypes = {
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node.isRequired,
}

export default MainLayout
