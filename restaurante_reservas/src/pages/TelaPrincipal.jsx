import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import TopBar from "../components/layout/TopBar.jsx";
import axios from 'axios';

export default function TelaPrincipal() {
    const navigate = useNavigate();
    const [nome ,setNome] = useState('');
    const [reservasHoje, setReservasHoje] = useState(0);
        
    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nome');
        if(nomeSalvo){
            setNome(nomeSalvo);
        };

        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reservas');
                const hoje = new Date().toISOString().split('T')[0];
                const countHoje = response.data.filter(r => r.data.split('T')[0] === hoje).length;
                setReservasHoje(countHoje);
            } catch(err) {
                console.error(err);
            }
        }

        fetchReservas();
    },[]);

    const onNavigateToRelatorio = () => {
        navigate('/TelaPrincipal');
    }
    const onNavigateToPendentes = () => {
        navigate('/TelaPrincipal');
    }
    const onNavigateToLogin = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('nome');
        navigate('/Login');
    }
    const onNavigateToReservas = () => {
        navigate('/Reservas');
    }

    return(
        
        <div className='auth-container'>
            <div className='top-Bar'>
                <TopBar/>
            </div>
            <div className='auth-card'>

                <div className='logo'>
                    <img 
                        src="restable-imagem-sem-fundo.png" 
                        className="logo-icon" alt="Restable 
                        Image-Logo" 
                    />
                    <h1 className='logo-title'>RESTABLE</h1>
                    <p className='logo-subtitle'>RESTAURANTE</p>
                    <h3 className='mensagem-welcome'>BEM-VINDO(A) DE VOLTA,{nome}!</h3>
                </div>

                <div className='actions'>
                    <h4 className='acao-tile'>AÇÕES RÁPIDAS</h4>
                    <button className='btn-primary'
                    onClick={onNavigateToReservas}>Realizar Nova Reserva</button>
                    <button onClick={onNavigateToPendentes} className='btn-secondary'>Reserva Pendentes</button>
                    
                </div>

                <div>
                    <h4 className='estatisticas-title'>ESTATÍSTICAS DO DIA</h4>

                    <div className='itens-status'>
                        <strong>Reservas Hoje:</strong> <span>{reservasHoje}</span> {/* ALTERADO */}
                    </div>

                    <div className='itens-status'>
                        <strong>Mesas Disponíveis:</strong> <span>10</span>
                    </div>

                    <button
                        onClick={onNavigateToRelatorio}
                        className='btn-relatorio'>
                        VER MINHAS RESERVAS PENDENTES
                    </button>

                    <button className='link-btn' onClick={onNavigateToLogin}>
                        SAIR DA CONTA
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
