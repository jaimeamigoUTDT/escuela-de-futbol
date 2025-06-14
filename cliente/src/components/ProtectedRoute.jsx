import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, roleComponents }) => {
  // Check if authToken exists in localStorage
  const authToken = localStorage.getItem('authToken');
  const isAuthenticated = !!authToken; // Convert to boolean

  // Retrieve userRole from localStorage
  const userRole = localStorage.getItem('userRole');

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roleComponents is provided, render the component based on userRole
  if (roleComponents && userRole) {
    const Component = roleComponents[userRole];
    if (Component) {
      return <Component />;
    }
    // Redirect to error page if no component matches the user's role
    return <Navigate to="/" replace />;
  }

  // If a specific role is required and the user doesn't have it, redirect to home
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if authenticated and role matches (if required)
  return <Outlet />;
};

export default ProtectedRoute;