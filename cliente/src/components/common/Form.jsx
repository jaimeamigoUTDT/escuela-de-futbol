import PropTypes from "prop-types"

function Form({ children, onSubmit, className = "", ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(e)
    }
  }

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
}

export default Form
