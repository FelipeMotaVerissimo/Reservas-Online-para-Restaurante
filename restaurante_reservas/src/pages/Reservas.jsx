import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reservas(){
    const navigate = useNavigate();
    const [reservaData, setReservaData] = useState({
        diaMarcado: '',
        horarioEscolhido: '',
        numeroPessoas: '',
        observacoesEspecial: '',
        telefone: '',
        email: '',
    });

    const handleReservaChange = (e) => {
        const {name, value} = e.target;
        setReservaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onNavigateToTelaPrincipal = () => {
        navigate('/TelaPrincipal');
    };

    const handleReservaSubmit = async () => {
        if(!reservaData.diaMarcado || !reservaData.horarioEscolhido || !reservaData.numeroPessoas || !reservaData.telefone || !reservaData.email){
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/reservas', {
                nome: localStorage.getItem('nome'),
                email: reservaData.email,
                telefone: reservaData.telefone,
                data: reservaData.diaMarcado,
                pessoas: Number(reservaData.numeroPessoas),
            });

            alert('Reserva realizada com sucesso!');
            onNavigateToTelaPrincipal();
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar reserva');
        }
    };

    return(
        <div className="auth-container">
            <div className="auth-card">
                <div className="logo">
                    <div className="logo-icon">🍽️</div>
                    <h1>RESTABLE</h1>
                    <p className="logo-subtitle">RESTAURANTE</p>
                </div>
                <h2 className="logo-subtitle">FAÇA SUA RESERVA</h2>
                <div className="auth-form">
                    <div className="form-group">
                        <input
                        type="date"
                        name="diaMarcado"
                        placeholder="DATA"
                        value={reservaData.diaMarcado}
                        onChange={handleReservaChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="time"
                        name="horarioEscolhido"
                        placeholder="HORARIO"
                        value={reservaData.horarioEscolhido}
                        onChange={handleReservaChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="number"
                        name="numeroPessoas"
                        placeholder="NUMERO DE PESSOAS"
                        value={reservaData.numeroPessoas}
                        onChange={handleReservaChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        name="observacoesEspecial"
                        placeholder="OBSERVAÇÕES"
                        value={reservaData.observacoesEspecial}
                        onChange={handleReservaChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        name="telefone"
                        placeholder="TELEFONE"
                        value={reservaData.telefone}
                        onChange={handleReservaChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        value={reservaData.email}
                        onChange={handleReservaChange}
                        />
                    </div>
                    <button onClick={handleReservaSubmit} className="btn-primary">
                        RESERVAR
                    </button>
                </div>

                <div className="auth-footer">
                    <button className="link-btn" onClick={onNavigateToTelaPrincipal}>
                      VER MINHAS RESERVAS
                    </button>
                    <button className="link-btn" onClick={onNavigateToTelaPrincipal}>
                      CANCELAR
                    </button>
                </div>
            </div>
        </div>
    );
}
