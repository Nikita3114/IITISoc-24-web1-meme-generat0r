import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext); 

  return isAuthenticated ? (
    <Element {...rest} /> 
  ) : (
    <Navigate to="/" /> 
  );
};

export default ProtectedRoute;
