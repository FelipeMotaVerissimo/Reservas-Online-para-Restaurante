import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../components/layout/TopBar.jsx";

export default function Pendentes({ atualizarEstatisticas }) {
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [loadingIds, setLoadingIds] = useState([]);

    const fetchReservas = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/reservas');
            setReservas(data);
        } catch (err) {
            console.error("Erro ao buscar reservas:", err);
            alert("Erro ao carregar reservas. Tente novamente mais tarde.");
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const atualizarReserva = async (id, acao) => {
        if (loadingIds.includes(id)) return; 
        setLoadingIds(prev => [...prev, id]);

        try {
            const url = `http://localhost:4000/api/reservas/${id}/${acao}`;
            const { data } = await axios.put(url);

            setReservas(prev => prev.map(r => r.id === id ? data.reserva : r));

            alert(`Reserva ${acao === 'confirmar' ? 'confirmada' : 'cancelada'} com sucesso!`);
        } catch (err) {
            console.error("Erro ao atualizar reserva:", err);
            alert("Erro ao atualizar reserva. Verifique se a reserva ainda existe.");
        } finally {
            setLoadingIds(prev => prev.filter(item => item !== id));
            if (typeof atualizarEstatisticas === 'function') {
                atualizarEstatisticas();
            }
        }
    };

    const confirmarReserva = (id) => atualizarReserva(id, 'confirmar');
    const cancelarReserva = (id) => atualizarReserva(id, 'cancelar');

    return (
        <div className="reservas-container">
            <TopBar />

            <div className="reservas-content">
                <h1 className="titulo-pagina">MINHAS RESERVAS</h1>

                <div className="resumo-status">
                    <div className="status-item confirmadas">
                        <span className="numero">
                            {reservas.filter(r => r.status === "confirmada").length}
                        </span>
                        <span className="rotulo">Confirmadas</span>
                    </div>

                    <div className="divider"></div>

                    <div className="status-item pendentes">
                        <span className="numero">
                            {reservas.filter(r => r.status === "pendente").length}
                        </span>
                        <span className="rotulo">Pendentes</span>
                    </div>
                </div>

                <h2 className="subtitulo">MESAS RESERVADAS</h2>

                <div className="cards-grid">
                    {reservas.length === 0 && (
                        <p className="nenhuma-reserva">Nenhuma reserva encontrada.</p>
                    )}

                    {reservas.map(reserva => (
                        <div className={`reserva-card ${reserva.status}`} key={reserva.id}>
                            <h3>
                                {new Date(reserva.data).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </h3>
                            <p>{reserva.pessoas} pessoas</p>

                            {reserva.status === "confirmada" ? (
                                <div className="confirm-status">Confirmada</div>
                            ) : (
                                <button
                                    className="btn-confirmar"
                                    onClick={() => confirmarReserva(reserva.id)}
                                    disabled={loadingIds.includes(reserva.id)}
                                >
                                    {loadingIds.includes(reserva.id) ? "Atualizando..." : "CONFIRMAR"}
                                </button>
                            )}

                            {reserva.status !== "cancelada" && (
                                <button
                                    className="btn-cancelar"
                                    onClick={() => cancelarReserva(reserva.id)}
                                    disabled={loadingIds.includes(reserva.id)}
                                >
                                    {loadingIds.includes(reserva.id) ? "Atualizando..." : "CANCELAR"}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
