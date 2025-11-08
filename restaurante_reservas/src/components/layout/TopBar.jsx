import { Link, useNavigate } from 'react-router-dom';
import { Bell, Home, Menu, User } from "lucide-react";
import { useEffect, useState } from 'react';

export default function TopBar(){

    const navigate = useNavigate();
    const [nome ,setNome] = useState('');

    // controla se menu do usuário está aberto (mantive)
    const [showUserMenu, setShowUserMenu] = useState(false);

    // novo state: guarda date/time atual
    const [agora, setAgora] = useState(new Date());

    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nome');
        if(nomeSalvo){
            setNome(nomeSalvo);
        }
    },[]);

    // atualiza relógio a cada 30 segundos (ajusta para 1000 se quiser 1s)
    useEffect(() => {
        const id = setInterval(() => setAgora(new Date()), 30000);
        return () => clearInterval(id);
    }, []);

    // formata com Intl (mm/dd/aaaa e hh:mm no formato pt-BR)
    const formatData = (date) => {
        try {
            const dataFormatter = new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const horaFormatter = new Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
            return `${dataFormatter.format(date)} • ${horaFormatter.format(date)}`;
        } catch (e) {
            // fallback simples
            return date.toLocaleDateString('pt-BR') + ' • ' + date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        }
    };

    // Função de logout
    const logout = () => {
        localStorage.clear();
        navigate('/Login');
    };

    return(
        <header className='topBar'>
            <div className='logoProduct'>
                <button className='btn btn-home'><Menu/></button>
                <img 
                    className='logo' 
                    src="/restable-image-sem-fundo.png" 
                    alt="Restable Logo" 
                />
            </div>

            {/* centro com data/hora */}
            <div className="topBar-center" aria-hidden={false}>
                <span className="data-hora">{formatData(agora)}</span>
            </div>

            <div>
                <button className='btn btn-sino'><Bell/></button>
                <button onClick={() => navigate('/telaPrincipal')} className='btn btn-home'><Home/></button>
                <div className="divider"></div>

                {/* Container do menu do usuário */}
                <div className='userMenuContainer'>
                    <button 
                        className='btn btn-User' 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        aria-expanded={showUserMenu}
                        aria-label="Abrir menu do usuário"
                    >
                        <User/>
                    </button>

                    {/* Menu dropdown (mantive seu comportamento) */}
                    {showUserMenu && (
                        <div className="userDropdown">
                            <span className="nomeDropdown">{nome}</span>
                            <button onClick={logout}>Sair</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
