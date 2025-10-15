import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import TelaPrincipal from '../pages/TelaPrincipal';
import Reservas from '../pages/Reservas';

// Componente para proteger rotas
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/Login" replace />;
}

// Wrapper para Login com navegação
function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onNavigateToCadastro={() => navigate('/Cadastro')} />;
}

// Wrapper para Cadastro com navegação
function CadastroWrapper() {
  const navigate = useNavigate();
  return <Cadastro onNavigateToLogin={() => navigate('/Login')} />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginWrapper />} />
        <Route path="/Cadastro" element={<CadastroWrapper />} />
        <Route 
          path="/TelaPrincipal" 
          element={
            <ProtectedRoute>
              <TelaPrincipal />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Reservas" 
          element={
            <ProtectedRoute>
              <Reservas />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/Login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}