import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Error from "../pages/error/Error";
import MatchesPage from "../pages/matches/Matches";
import Profile from "../pages/profile/Profile";
import Results from "../pages/results/Results";
import Tournaments from "../pages/tournaments/Tournaments";
import Admin from "../pages/admin/Admin";
import AdminPlayersPage from "../pages/players/AdminPlayers";
import PlayersPage from "../pages/players/Players";
import ProtectedRoute from "../components/ProtectedRoute";

// Route configurations
export const routeConfig = [
  {
    path: "/login",
    element: <Login />,
    label: "Login",
  },
  {
    path: "/register",
    element: <Register />,
    label: "Register",
  },
  {
    path: "/",
    element: <Error />,
    label: "Error",
  },
  {
    element: <ProtectedRoute />, // General protected routes
    children: [
      {
        path: "/home",
        element: <Home />,
        label: "Home",
      },
      {
        path: "/partidos",
        element: <MatchesPage />,
        label: "Matches",
      },
      {
        path: "/perfil",
        element: <Profile />,
        label: "Profile",
      },
      {
        path: "/resultados",
        element: <Results />,
        label: "Results",
      },
      {
        path: "/torneos",
        element: <Tournaments />,
        label: "Tournaments",
      },
      {
        path: "/jugadores",
        element: (
          <ProtectedRoute
            roleComponents={{
              admin: AdminPlayersPage,
              parent: PlayersPage,
            }}
          />
        ),
        label: "Players",
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRole="admin" />, // Admin-only routes
    children: [
      {
        path: "/admin",
        element: <Admin />,
        label: "Admin",
      },
    ],
  },
];

// Routes component that renders all routes
export function AppRoutes() {
  return (
    <Routes>
      {routeConfig.map((route, index) => (
        <Route key={route.path || index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={child.element}
              />
            ))}
        </Route>
      ))}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

// Helper function to get navigation items
export function getNavigationItems() {
  const navItems = [];
  routeConfig.forEach((route) => {
    if (route.path && route.label) {
      navItems.push({ path: route.path, label: route.label });
    }
    if (route.children) {
      route.children.forEach((child) => {
        if (child.path && child.label) {
          navItems.push({ path: child.path, label: child.label });
        }
      });
    }
  });
  return navItems;
}