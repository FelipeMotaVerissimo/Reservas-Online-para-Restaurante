import React, { useState } from 'react';
import Login from './Login';
import Cadastro from './Cadastro';
import Reservas from './Reservas';
import TelaPrincipal from './TelaPrincipal';

export default function Auth() {
  const [currentPage, setCurrentPage] = useState('login');

  const handleNavigateToCadastro = () => {
    setCurrentPage('cadastro');
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };
  const handleNavigateToReservas = () => {
    setCurrentPage('reservas');
  };
  const handleNavigateToTelaPrincipal = () => {
    setCurrentPage('telaPrincipal');
  };

  return (
    <>
      {currentPage === 'login' && (
        <Login onNavigateToCadastro={handleNavigateToCadastro} />
      )}

      {currentPage === 'cadastro' && (
        <Cadastro onNavigateToLogin={handleNavigateToLogin} />
      )}

      {currentPage === 'telaPrincipal' && (
        <TelaPrincipal onNavigateToTelaPrincipal={handleNavigateToTelaPrincipal} />
      )}

      {currentPage === 'reservas' && (
        <Reservas onNavigateToTelaPrincipal={handleNavigateToTelaPrincipal} />
      )}
    </>
  );
}