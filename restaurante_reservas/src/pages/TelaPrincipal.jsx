import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../components/layout/TopBar.jsx";

export default function TelaPrincipal() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [reservasHoje, setReservasHoje] = useState(0);
    const [mesasDisponiveis, setMesasDisponiveis] = useState(10);
    const TOTAL_MESAS = 10;

    const atualizarEstatisticas = async () => {
        try {
            const { data: reservas } = await axios.get('http://localhost:4000/api/reservas');
            const hoje = new Date().toISOString().split('T')[0];
            const reservasHojeArray = reservas.filter(
                r => r.data.split('T')[0] === hoje && r.status !== "cancelada"
            );

            setReservasHoje(reservasHojeArray.length);
            const disponiveis = TOTAL_MESAS - reservasHojeArray.length;
            setMesasDisponiveis(disponiveis >= 0 ? disponiveis : 0);
        } catch (err) {
            console.error("Erro ao buscar reservas:", err);
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/Login');
            return;
        }

        const nomeSalvo = localStorage.getItem('nome');
        if (nomeSalvo) setNome(nomeSalvo);

        atualizarEstatisticas();

        const handleFocus = () => atualizarEstatisticas();
        window.addEventListener('focus', handleFocus);

        return () => window.removeEventListener('focus', handleFocus);
    }, [navigate]);

    const onNavigateToPendentes = () => navigate('/pendentes');
    
    const onNavigateToLogin = () => {
        localStorage.clear();
        window.location.href = '/Login';
    };

    const onNavigateToReservas = () => navigate('/Reservas');

    return (
        <div className='auth-container'>
            <div className='top-Bar'>
                <TopBar />
            </div>
            <div className='auth-card'>
                <div className='logo'>
                    <img 
                        src="/restable-image-sem-fundo.png" 
                        alt="Logo Restable" 
                        className="logo-central" 
                    />
                    <p className='logo-subtitle'>RESTAURANTE</p>
                    <h3 className='mensagem-welcome'>BEM-VINDO(A) DE VOLTA</h3>
                    <h3 className='mensagem-welcome-name'>{nome}!</h3>
                </div>

                <div className='actions'>
                    <h4 className='acao-tile'>AÇÕES RÁPIDAS</h4>
                    <button className='btn-primary' onClick={onNavigateToReservas}>
                        Realizar Nova Reserva
                    </button>
                    <button className='btn-secondary' onClick={onNavigateToPendentes}>
                        Reservas Pendentes
                    </button>
                </div>

                <div>
                    <h4 className='estatisticas-title'>ESTATÍSTICAS DO DIA</h4>

                    <div className='itens-status'>
                        <strong>Reservas Hoje:</strong> <span>{reservasHoje}</span>
                    </div>

                    <div className='itens-status'>
                        <strong>Mesas Disponíveis:</strong> <span>{mesasDisponiveis}</span>
                    </div>

                    <button className='link-btn' onClick={onNavigateToLogin}>
                        SAIR DA CONTA
                    </button>
                </div>
            </div>
        </div>
    );
}
