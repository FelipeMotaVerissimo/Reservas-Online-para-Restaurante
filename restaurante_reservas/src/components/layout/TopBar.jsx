import {Link, useNavigate} from 'react-router-dom';
import { Bell, Home, Menu, User } from "lucide-react";
import { useEffect, useState } from 'react';

export default function TopBar(){

    const navigate = useNavigate();
    const [nome ,setNome] = useState('');
    
    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nome');
        if(nomeSalvo){
            setNome(nomeSalvo);
        };
    },[]);

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
            <div>
                <button className='btn btn-sino'><Bell/></button>
                <button onClick={() => navigate('/telaPrincipal')} className='btn btn-home'><Home/></button>
                <div class="divider"></div>
                <button className='btn btn-User'><User/></button>
                <span> {nome || "Usuario"} </span>
            </div>
        </header>
    );
}