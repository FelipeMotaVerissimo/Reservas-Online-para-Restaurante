import React, { useState } from 'react';
import Login from './Login';
import Cadastro from './Cadastro';

export default function Auth() {
  const [currentPage, setCurrentPage] = useState('login');

  const handleNavigateToCadastro = () => {
    setCurrentPage('cadastro');
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' ? (
        <Login onNavigateToCadastro={handleNavigateToCadastro} />
      ) : (
        <Cadastro onNavigateToLogin={handleNavigateToLogin} />
      )}
    </>
  );
}