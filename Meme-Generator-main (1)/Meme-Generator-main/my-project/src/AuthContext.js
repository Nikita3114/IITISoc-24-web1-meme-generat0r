import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookies.get('TOKEN');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };