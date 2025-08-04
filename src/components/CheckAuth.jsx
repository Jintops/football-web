import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ user, isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login with memory of where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // You can add further role-based conditions here if needed
  return <>{children}</>;
};

export default CheckAuth;
