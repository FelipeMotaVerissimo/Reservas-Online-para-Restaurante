import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onNavigateToCadastro }) {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const onNavigateToTelaPrincipal = async () => {
    if (!loginData.email || !loginData.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/login', loginData);

      if (response.data.success) {

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('nome', response.data.nome);
        navigate('/telaPrincipal');
      } else {
        alert('Email ou senha incorretos!');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">
          <div className="logo-icon">🍽️</div>
          <h1>RESTABLE</h1>
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

          <button onClick={onNavigateToTelaPrincipal} className="btn-primary">
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
