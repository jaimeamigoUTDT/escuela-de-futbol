import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  // Check if authToken exists in localStorage
  const authToken = localStorage.getItem('authToken');

  let isAuthenticated = false;

  if (authToken) {
    isAuthenticated = true;
  }

  // Retrieve userRole from localStorage (assuming it's stored as a string)
  const userRole = localStorage.getItem('userRole');

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user doesn't have it, redirect to home
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if authenticated and role matches (if required)
  return <Outlet />;
};

export default ProtectedRoute;