import React, { createContext, useState, useContext, useEffect } from 'react';

// Créez un contexte pour l'authentification
export const AuthContext = createContext();

// Définissez un fournisseur pour l'authentification
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Vérifiez si un token est présent dans le stockage local à chaque rendu
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole('');
    }
  }, []); // Cela s'exécute une seule fois au montage

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportez le fournisseur comme export par défaut
export default AuthProvider;

// Fonction utilitaire pour utiliser facilement le contexte
export const useAuth = () => useContext(AuthContext);
