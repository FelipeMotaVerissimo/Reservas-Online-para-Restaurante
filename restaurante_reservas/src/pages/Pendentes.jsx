import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TopBar from "../components/layout/TopBar.jsx";

export default function Pendentes() {
    
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const nome = localStorage.getItem('nome');
                const response = await axios.get('http://localhost:4000/api/reservas');
                setReservas(response.data);
            } catch(err) {
                console.error(err);
            }
        }
        fetchReservas();
    }, []);

    const confirmarReservas = async(id) => {
        try{
            await axios.put(`http://localhost:4000/api/reservas/${id}`, { status: "confirmada" });
            setReservas(reservas.map(r => r._id === id ? { ...r, status: "confirmada" } : r));
            alert('Reserva Confirmada!');
        } catch(err) {
            console.error(err);
        }
    };

    const cancelarReserva = async (id) => {
        try{
            await axios.delete(`http://localhost:4000/api/reservas/${id}`, { status: "cancelada" });
            setReservas(reservas.filter(r => r._id !== id ? { ...r, status: "cancelada" } : r));
            alert('Reserva Cancelada!');
        }catch(err) {
            console.error(err);
        }
    };


return (
    <div className="reservas-container">
        <TopBar />

        <div className="reservas-content">

        <h1 className="titulo-pagina">MINHAS RESERVAS</h1>

        <div className="resumo-status">

            <div className="status-item confirmadas">

                <span className="numero">
                    {reservas.filter((r) => r.status === "confirmada").length}
                </span>

                <span className="rotulo">Confirmadas</span>
                </div>

                <div className="divider"></div>

                <div className="status-item pendentes">
                <span className="numero">
                    {reservas.filter((r) => r.status === "pendente").length}
                </span>

                <span className="rotulo"> Pendentes</span>

            </div>

        </div>

        <h2 className="subtitulo">MESAS RESERVADAS</h2>

        <div className="cards-grid">

            {reservas.length === 0 && (
                <p className="nenhuma-reserva">Nenhuma reserva encontrada.</p>
            )}

            {reservas.map((reserva) => (
            <div className={`reserva-card ${reserva.status}`} key={reserva._id}>
                <h3>
                    {new Date(reserva.data).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                    {reserva.hora && (
                        <>
                            {" • "}
                            {new Date(`1970-01-01T${reserva.hora}`).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </>
                    )}
                </h3>
                <p>{reserva.pessoas} pessoas</p>
                {reserva.observacoes && <p>{reserva.observacoes}</p>}

                {reserva.status === "confirmada" ? (
                <div className="confirm-status">Confirmada</div>
                ) : (
                <button
                    className="btn-confirmar"
                    onClick={() => confirmarReservas(reserva._id)}
                >
                    CONFIRMAR
                </button>
                )}

                {reserva.status !== "cancelada" && (
                <button
                    className="btn-cancelar"
                    onClick={() => cancelarReserva(reserva._id)}
                >
                    CANCELAR
                </button>
                )}
            </div>
            ))}
        </div>
        </div>
    </div>
    );

}