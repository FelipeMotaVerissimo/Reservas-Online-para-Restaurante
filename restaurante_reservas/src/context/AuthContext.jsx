import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedNome = localStorage.getItem('nome');
    if (storedAuth) setIsAuthenticated(true);
    if (storedNome) setNome(storedNome);
  }, []);

  const login = (nome) => {
    setIsAuthenticated(true);
    setNome(nome);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('nome', nome);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setNome('');
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, nome, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
