import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Register from "../pages/register/Register"
import Login from "../pages/login/Login"


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
