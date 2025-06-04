import PropTypes from "prop-types"

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  ...props
}) {
  const getButtonClass = () => {
    let baseClass = "btn"

    // Variant classes
    switch (variant) {
      case "primary":
        baseClass += " btn-primary"
        break
      case "secondary":
        baseClass += " btn-secondary"
        break
      case "danger":
        baseClass += " btn-danger"
        break
      default:
        baseClass += " btn-primary"
    }

    // Size classes
    switch (size) {
      case "small":
        baseClass += " btn-small"
        break
      case "large":
        baseClass += " btn-large"
        break
      default:
        baseClass += " btn-medium"
    }

    if (disabled || loading) {
      baseClass += " btn-disabled"
    }

    return baseClass
  }

  return (
    <button type={type} className={getButtonClass()} disabled={disabled || loading} onClick={onClick} {...props}>
      {loading ? (
        <>
          <span className="loading-spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
