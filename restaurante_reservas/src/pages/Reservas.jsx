import React, {useState} from {react};

export default function Reservas(){
    const [reservaData, setReservaData] = useState({
        diaMarcado: '',
        horarioEscolhido: '',
        numeroPessoas: '',
        observacoesEspecial: '',
    });

    const handleReservaChange = (e) => {
        const {name, value} = e.target;
        setReservaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleReservaSubmit = () => {
        if(!reservaData.diaMarcado || !reservaData.horarioEscolhido || !reservaData.numeroPessoas){
            alert('Por favor, preencha todos os campos.');
            return;
        }
        console.log('Dados da reserva:', reservaData);
        alert('Reserva realizada com sucesso!');
        onNavigateToTelaPrincipal();
    }
    const onNavigateToTelaPrincipal = () => {
        navigate('/TelaPrincipal');
    }

    return(
        <div className="auth-coitainer">
            <div className="auth-card">
                <div className="logo">
                    <div className="logo-icon">🍽️</div>
                    <h1>RESTABLE</h1>
                    <p className="logo-subtitle">RESTAURANTE</p>
                </div>
            </div>
            <h2 className="logo-subtitle">FAÇA SUA RESERVA</h2>
            <div className="auth-form">
                <div className="form-group">
                    <input
                    type="text"
                    name="data"
                    placeholder="DATA"
                    value={reservaData.diaMarcado}
                    onChange={handleReservaChange}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="horario"
                    placeholder="HORARIO"
                    value={reservaData.horarioEscolhido}
                    onChange={handleReservaChange}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="numPessoas"
                    placeholder="NUMERO DE PESSOAS"
                    value={reservaData.numeroPessoas}
                    onChange={handleReservaChange}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="obsEspeciais"
                    placeholder="OBSERVAÇÕES"
                    value={reservaData.observacoesEspecial}
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
    );
}