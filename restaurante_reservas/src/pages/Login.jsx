import React, { useState } from 'react';

export default function Login({ onNavigateToCadastro }) {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = () => {
    if (!loginData.email || !loginData.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    console.log('Login:', loginData);
    alert('Login realizado com sucesso!');
    // Aqui você faria a chamada à API
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">
          <div className="logo-icon">🍽️</div>
          <h1>SABOR & ARTE</h1>
          <p className="logo-subtitle">RESTAURANTE</p>
        </div>

        <h2 className="auth-title">BEM-VINDO DE VOLTA</h2>

        <div className="auth-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-MAIL"
              value={loginData.email}
              onChange={handleLoginChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="senha"
              placeholder="SENHA"
              value={loginData.senha}
              onChange={handleLoginChange}
            />
          </div>

          <button onClick={handleLoginSubmit} className="btn-primary">
            ENTRAR
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
          <p>Não tem una conta?</p>
          <button className="link-btn" onClick={onNavigateToCadastro}>
            CADASTRE-SE
          </button>
        </div>
      </div>
    </div>
  );
}