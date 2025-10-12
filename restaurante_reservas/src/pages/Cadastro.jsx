import React, { useState } from 'react';

export default function Cadastro({ onNavigateToLogin }) {
  const [cadastroData, setCadastroData] = useState({
    nomeCompleto: '',
    email: '',
    criarSenha: '',
    confirmarSenha: ''
  });

  const handleCadastroChange = (e) => {
    const { name, value } = e.target;
    setCadastroData(prev => ({ ...prev, [name]: value }));
  };

  const handleCadastroSubmit = () => {
    if (!cadastroData.nomeCompleto || !cadastroData.email || !cadastroData.criarSenha || !cadastroData.confirmarSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    if (cadastroData.criarSenha !== cadastroData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Cadastro:', cadastroData);
    alert('Cadastro realizado com sucesso!');
    // Aqui você faria a chamada à API
    onNavigateToLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">
          <div className="logo-icon">🍽️</div>
          <h1>SABOR & ARTE</h1>
          <p className="logo-subtitle">RESTAURANTE</p>
        </div>

        <h2 className="auth-title">CRIAR SUA CONTA</h2>

        <div className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="nomeCompleto"
              placeholder="NOME COMPLETO"
              value={cadastroData.nomeCompleto}
              onChange={handleCadastroChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-MAIL"
              value={cadastroData.email}
              onChange={handleCadastroChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="criarSenha"
              placeholder="CRIAR SENHA"
              value={cadastroData.criarSenha}
              onChange={handleCadastroChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmarSenha"
              placeholder="CONFIRMAR SENHA"
              value={cadastroData.confirmarSenha}
              onChange={handleCadastroChange}
            />
          </div>

          <button onClick={handleCadastroSubmit} className="btn-primary">
            CADASTRAR
          </button>
        </div>

        <div className="social-login">
          <p className="social-text">OU FAÇA LOGIN COM</p>
          <div className="social-icons">
            <button className="social-btn google">
              <span>G</span>
            </button>
            <button className="social-btn facebook">
              <span>f</span>
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <button className="link-btn back-btn" onClick={onNavigateToLogin}>
            ← Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
}