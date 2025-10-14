import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserSession } from '../../utils/session';

const ProtectedRoute = ({ 
  children, 
  adminOnly = false 
}) => {
  const user = getUserSession();
  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== 'admin') {
    alert('❌ ¡Solo el Archimago Supreme puede acceder al Sanctum!');
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;