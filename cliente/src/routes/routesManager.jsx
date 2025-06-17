import { Routes, Route } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Error from "../pages/error/Error";
import AdminMatchesPage from "../pages/matches/adminMatches/AdminMatchesPage";
import ParentMatchesPage from "../pages/matches/parentMatches/ParentMatchesPage";
import Results from "../pages/results/Results";
import TeamsPage from "../pages/teams/Teams";
import PlayersPage from "../pages/players/Players";
import ProtectedRoute from "../components/ProtectedRoute";
import adminHome from "../pages/home/adminHome/adminHome";
import parentHome from "../pages/home/parentHome/parentHome";

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
        path: "/partidos",
        element: (
          <ProtectedRoute
            roleComponents={{
              superAdmin: AdminMatchesPage, // Assuming AdminMatchesPage is defined elsewhere
              admin: AdminMatchesPage,
              parent: ParentMatchesPage, // Assuming ParentMatchesPage is defined elsewhere
            }}
          />
        ),
        label: "Matches",
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute
            roleComponents={{
              superAdmin: adminHome,
              admin: adminHome,
              parent: parentHome, // Assuming ParentMatchesPage is defined elsewhere
            }}
          />
        ),
        label: "Matches",
      },
      {
        path: "/resultados",
        element: <Results />,
        label: "Results",
      },
      {
        path: "/jugadores",
        element: (
          <ProtectedRoute
            roleComponents={{
              superAdmin: TeamsPage, // Assuming PlayersPage is defined elsewhere
              admin: TeamsPage,
              parent: PlayersPage,
            }}
          />
        ),
        label: "Players",
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