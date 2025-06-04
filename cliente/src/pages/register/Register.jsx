import { useState } from "react"
import FormField from "../../components/common/FormField"
import Button from "../../components/common/Button"
import Form from "../../components/common/Form"
import "../../styles/components/FormComponents.css"
import "./Register.css"

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        dni: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = "El email es obligatorio"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Por favor, ingresá un email válido"
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria"
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres"
        }

        if (!formData.name) {
            newErrors.name = "El nombre completo es obligatorio"
        }

        if (!formData.dni) {
            newErrors.dni = "El DNI es obligatorio"
        } else if (!/^\d+$/.test(formData.dni)) {
            newErrors.dni = "El DNI debe contener solo números"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        if (!validateForm()) return

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log("Intento de registro:", formData)
            alert("Registro completado")
        } catch (error) {
            console.error("Error de registro:", error)
            alert("Error al registrarse. Intentá nuevamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="register-container">
            {/* Left side - Image */}
            <div className="register-image-section">
                <img
                    src="src/assets/landing-soccer.png"
                    alt="register illustration"
                    className="register-image"
                />
            </div>

            {/* Right side - Form */}
            <div className="register-form-section">
                <div className="register-form-container">
                    <h2 className="register-title">Crea una cuenta</h2>

                    <Form onSubmit={handleSubmit}>
                        <FormField
                            label="Nombre completo"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ingresá tu nombre completo"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={errors.name}
                            required
                        />

                        <FormField
                            label="DNI"
                            type="number"
                            id="dni"
                            name="dni"
                            placeholder="Ingresá tu DNI sin puntos ni espacios"
                            value={formData.dni}
                            onChange={handleInputChange}
                            error={errors.dni}
                            required
                        />

                        <FormField
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                            required
                        />

                        <FormField
                            label="Contraseña"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresá tu contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={errors.password}
                            required
                        />

                        <Button type="submit" variant="primary" size="medium" loading={isLoading} className="register-submit-button">
                            Registrarse
                        </Button>
                    </Form>

                    <div className="register-signup-link">
                        ¿Ya tenés una cuenta? <a href="/login">Iniciar sesión</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
