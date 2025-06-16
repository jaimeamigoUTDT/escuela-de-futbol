import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // 10 second timeout
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken")
    const userDni = localStorage.getItem("userDni")

    // Add to query params for GET, to body for POST/PUT/DELETE
    if (config.method === "get") {
      config.params = config.params || {}
      if (authToken) config.params.authToken = authToken
      if (userDni) config.params.dni = userDni
    } else {
      config.data = config.data || {}
      if (authToken) config.data.authToken = authToken
      if (userDni) config.data.dni = userDni
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)

    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      localStorage.removeItem("authToken")
      localStorage.removeItem("userDni")
      //window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

export default api
