"use client"

import PropTypes from "prop-types"
import { useEffect, useRef } from "react"

function FormField({
  label,
  type = "text",
  id,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  error,
  customValidationMessage,
  ...props
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && customValidationMessage) {
      inputRef.current.setCustomValidity(customValidationMessage)
    }
  }, [customValidationMessage])

  const handleInvalid = (e) => {
    if (customValidationMessage) {
      e.target.setCustomValidity(customValidationMessage)
    } else {
      // Set default custom messages based on validation type
      if (e.target.validity.valueMissing) {
        
          e.target.setCustomValidity(`Por favor ingresá tú ${label.toLowerCase()}`)
          
      } else if (e.target.validity.typeMismatch && type === "email") {
        e.target.setCustomValidity("Por favor ingresá un email válido")
      }
    }
  }

  const handleInput = (e) => {
    // Clear custom validity when user starts typing
    e.target.setCustomValidity("")
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        onInvalid={handleInvalid}
        required={required}
        className={`form-input ${error ? "error" : ""}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  customValidationMessage: PropTypes.string,
}

export default FormField
