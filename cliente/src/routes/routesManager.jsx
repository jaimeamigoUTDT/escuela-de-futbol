import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Register from "../pages/register/Register"
import Login from "../pages/login/Login"
import Error from "../pages/error/Error"
import Matches from "../pages/matches/Matches"
import Profile from "../pages/profile/Profile"
import Results from "../pages/results/Results"
import Tournaments from "../pages/tournaments/Tournaments"
import Admin from "../pages/admin/Admin"


// Route configurations
export const routeConfig = [
  {
    path: "/home",
    element: <Home />,
    label: "Home",
  },
  {
    path: "/register",
    element: <Register />,
    label: "Register",
  },
  {
    path: "/login",
    element: <Login />,
    label: "login",
  },
  {
    path: "/",
    element: <Error />, // Default route
    label: "Error",
  },
  {
    path: "/partidos",
    element: <Matches />, // Default route
    label: "Matches",
  },
  {
    path: "/perfil",
    element: <Profile />, // Default route
    label: "Profile",
  },
  {
    path: "/resultados",
    element: <Results />, // Default route
    label: "Results",
  },
  {
    path: "/torneos",
    element: <Tournaments />, // Default route
    label: "Tournaments",
  },
  {
    path: "/admin",
    element: <Admin />, // Default route
    label: "Admin",
  },
]

// Routes component that renders all routes
export function AppRoutes() {
  return (
    <Routes>
      {routeConfig.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}

// Helper function to get navigation items
export function getNavigationItems() {
  return routeConfig.map((route) => ({
    path: route.path,
    label: route.label,
  }))
}
