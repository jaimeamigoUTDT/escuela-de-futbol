import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from "./routes/routesManager"
import { useBackendMessage } from "./hooks/useBackendMessage"
import "./App.css"

function App() {
  const { message, loading, error } = useBackendMessage()

  return (
    <Router>
      <div>

        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App
