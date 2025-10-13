
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';


const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

