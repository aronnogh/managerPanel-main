// AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("username"));

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    Cookies.remove("username");
    Cookies.remove("role");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);