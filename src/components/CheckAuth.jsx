import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ user, isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to the right login page based on path
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional Role-Based Protection
  if (location.pathname.startsWith("/admin") && user?.role !== "admin") {
    return <Navigate to="/" replace />; // Or show 'Unauthorized' page
  }

  return <>{children}</>;
};

export default CheckAuth;
