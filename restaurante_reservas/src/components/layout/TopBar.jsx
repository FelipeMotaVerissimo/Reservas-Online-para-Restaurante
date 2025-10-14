import {Link, useNavigate} from 'react-router-dom';
import { Bell, Menu, User } from "lucide-react";
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
                <img className='logo' 
                    src="/restable-imagem-sem-fundo.png" 
                    alt="Restable Image-Logo" 
                />
                <span className='restaurant-name'>RESTABLE</span>
            </div>
            <div>
                <button className='btn btn-sino'><Bell/></button>
                <button className='btn btn-menu'><Menu/></button>
                <span> {nome || "Usuario"} </span>
                <button className='btn btn-User'><User/></button>
            </div>
        </header>
    );
}