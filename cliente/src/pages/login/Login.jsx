import { useState } from "react"
import FormField from "../../components/common/FormField"
import Button from "../../components/common/Button"
import Form from "../../components/common/Form"
import "../../styles/components/FormComponents.css"
import "./login.css"
import useLogin from "../../hooks/useLogin"
import soccerImg from '../../../public/assets/landing-soccer.png';


function Login() {
    const [formData, setFormData] = useState({
        dni: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useLogin()

    // Incorrect implementation
    const handleLogin = async (e) => {
        setIsLoading(true);
        
        const success = await login(e.target.dni.value, e.target.password.value); // Passing input elements, not their values
        
        if (success) {
            // Redirect or show success message
            console.log("Login successful");
            window.location.href = "/home";
        } else {
            setIsLoading(false);
            // Show error message
            console.error("Login failed", error);}
    };

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

    return (
        <div className="login-container">
            {/* Left side - Image */}
            <div className="login-image-section">
                <img
                    src={soccerImg}
                    alt="login illustration"
                    className="login-image"
                />
            </div>

            {/* Right side - Form */}
            <div className="login-form-section">
                <div className="login-form-container">
                    <h2 className="login-title">Ingresá a tu cuenta</h2>

                    <Form onSubmit={handleLogin}>

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

                        <Button type="submit" variant="primary" size="medium" loading={isLoading} className="login-submit-button">
                            Iniciar sesión
                        </Button>
                    </Form>

                    <div className="login-signup-link">
                        ¿No tenés una cuenta? <a href="/register">Crear cuenta</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
