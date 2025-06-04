import { useState } from "react"
import FormField from "./FormField"
import Button from "./Button"
import Form from "./Form"
import "../../styles/components/FormComponents.css"

function ExampleUsage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    console.log("Form submitted:", formData)
  }

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
      <h3>Contact Form Example</h3>

      <Form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Email Address"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="button" variant="danger" size="small">
            Delete
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ExampleUsage
