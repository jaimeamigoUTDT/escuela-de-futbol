import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from "./routes/routesManager"

function App() {
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
