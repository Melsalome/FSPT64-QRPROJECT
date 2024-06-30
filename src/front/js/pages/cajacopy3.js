import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/caja.css";
import mesasImage from '../../img/mesas.png';
import menu from "../../img/menu.png";
import factura from "../../img/factura.png";
import ajustes from "../../img/ajustes.png";
import pantone from "../../img/pantone.png";
import cajero from "../../img/cajero.png";
import iconoMesas from "../../img/icono-mesa.png";
import iconoAtras from "../../img/flecha-hacia-atras.png";
import iconoLlave from "../../img/llave.png";
import iconoPagar from "../../img/pagar.png";
import iconoAnadir from "../../img/anadir.png";
import iconoEliminar from "../../img/eliminar.png";
import iconoDash from "../../img/dash.png";
import suelo from "../../img/suelo506.png";
import { Context } from "../store/appContext";
import Mesa from "../component/Mesa";
import Facturas from "./Facturasview";




const Caja = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filterDate, setFilterDate] = useState("");
    const [largoSala, setLargoSala] = useState('600px');
    const [anchoSala, setAnchoSala] = useState('600px');
    const [mesas, setMesas] = useState([]);
    const [angulosRotacion, setAngulosRotacion] = useState({});
    const [mostrarCarta, setMostrarCarta] = useState(false);
    const { store, actions } = useContext(Context)
    const [activeSession, setActiveSession] = useState({ id_table: 1, products: [] })
    const [loading, setLoading] = useState(true)
    const [selectedTable, setSelectedTable] = useState(null)
    const recuperarEstado = () => {
        const largo = JSON.parse(localStorage.getItem('largoSala')) || '600px';
        const ancho = JSON.parse(localStorage.getItem('anchoSala')) || '600px';
        const mesasGuardadas = JSON.parse(localStorage.getItem('mesas')) || [];
        const angulosGuardados = JSON.parse(localStorage.getItem('angulosRotacion')) || {};
        const tickets = [
            { idTicket: '1', idPedido: '100', nombreRestaurante: 'El Buen Sabor', cif: 'A12345678', fecha: '2023-04-01' },
            // Agrega más tickets aquí
        ];



        setLargoSala(largo);
        setAnchoSala(ancho);
        setMesas(mesasGuardadas);
        setAngulosRotacion(angulosGuardados);
    };

    const navigate = useNavigate();

    const irADashboard = () => {
        navigate('../app/dashboard');
    };

    const manejarClickAnadir = () => {
        setMostrarCarta(true);
    };

    const manejarClickAtras = () => {
        setMostrarCarta(false);
    };

    const abrirCaja = () => {
        alert("Cash Box Opened!");
    }

    useEffect(() => {
        const fetchData = async () => {
            recuperarEstado();
            await handleActiveSessionList();
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const aplicarMedidas = () => {
            const contenedorMesas = document.querySelector('.container-caja-mesas');
            if (contenedorMesas) {
                contenedorMesas.style.height = `${largoSala * 55}px`;
                contenedorMesas.style.width = `${anchoSala * 55}px`;
            }
        };
        aplicarMedidas();
    }, [largoSala, anchoSala]);

    const handleActiveSession = async (table_number) => {
        const data = await actions.getActiveSessionTable(table_number)
        setActiveSession(data)
    }

    const handleActiveSessionList = async () => {
        const dataSessionList = await actions.getActiveSessionList();
        setMesas(prevMesas =>
            prevMesas.map((mesa) => {
                const isActive = dataSessionList.some(session => session.status == 'active' && session.table_number == mesa.table_number);
                return { ...mesa, isActive };
            })
        );
    };



    useEffect(() => {
    }, [activeSession])


    useEffect(() => {
        const interval = setInterval(() => {
            handleActiveSessionList();
        }, 3000000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await dispatcherInvoice.getTickets(); // Llamamos a la función getTickets
            setTickets(data);
            setFilteredTickets(data);
            setLoading(false);
        };
        fetchTickets();
    }, []);

    const handleFilterChange = (e) => {
        const date = e.target.value;
        setFilterDate(date);
        const filtered = tickets.filter(ticket => ticket.fecha === date);
        setFilteredTickets(filtered);
    };

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
    };



    return (
        <div>
            <h2>Vista de Caja</h2>
            <Facturas tickets={tickets} />
        </div>
    );
};
return (
    <div>
        <h1>Vista de Caja</h1>
        <div>
            <label htmlFor="filterDate">Filtrar por fecha:</label>
            <input
                type="date"
                id="filterDate"
                value={filterDate}
                onChange={handleFilterChange}
            />
        </div>
        <div className="facturas-container">
            {loading ? (
                <div>Cargando tickets...</div>
            ) : (
                <Facturas
                    tickets={filteredTickets}
                    onTicketClick={handleTicketClick}
                />
            )}
        </div>
        {selectedTicket && (
            <div className="ticket-detalle">
                <h2>Detalles del Ticket</h2>
                <p>Id Ticket: {selectedTicket.idTicket}</p>
                <p>Id Pedido: {selectedTicket.idPedido}</p>
                <p>Table Number: {selectedTicket.tableNumber}</p>
                <p>Total Price: {selectedTicket.totalPrice}</p>
                <p>Fecha: {selectedTicket.fecha}</p>
                {/* Agregar más detalles si es necesario */}
            </div>
        )}
    </div>
);
};

// return (
//     <>
//         <section>

//             <h1 className='section-mesas-tittle'>Cash</h1>
//             <div className="container-ticket">
//                 <div className="botones-arriba">
//                     {/* <button onClick={irADashboard} className="boton-dash"><img src={iconoDash} alt="Atrás" style={{ width: '30px', height: '30px' }} /> Dashboard</button> */}
//                     <button className="boton-atras" onClick={manejarClickAtras}><img src={iconoAtras} alt="Atrás" style={{ width: '20px', height: '20px' }} /> Back</button>

//                 </div>
//                 <div className="ticket">
//                     <div className="ticket_table">
//                         {
//                             <div className="ticket-view">
//                                 <h5> Table number: {activeSession.table_number}</h5>
//                                 <h5> Items: ✍</h5>
//                                 <ul>
//                                     {activeSession.products && activeSession.products.length > 0 ? (
//                                         activeSession.products.map((product, index) => (
//                                             <li key={index}>{product.product_name} x {product.quantity}</li>
//                                         ))
//                                     ) : (
//                                         <li>Empty.</li>
//                                     )}
//                                 </ul>
//                                 <Facturas />

//                                 <h2></h2>
//                             </div>
//                         }
//                     </div>
//                 </div>
<div className="botones">
    <button onClick={abrirCaja} className="boton-abrir-caja">Open Cash<img src={iconoLlave} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
    <button className="boton-pagar">Pay <br></br><img src={iconoPagar} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
    <button className="boton-anadir" onClick={manejarClickAnadir}>Add <img src={iconoAnadir} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
    <button className="boton-eliminar">Delete <img src={iconoEliminar} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
</div>

{
    !mostrarCarta ? (
        <div className="container-caja-mesas" style={{ backgroundImage: `url(${suelo})`, backgroundSize: '110px', backgroundPosition: 'center' }}>
            {mesas.map((mesa) => (
                <Mesa key={mesa.id} mesa={mesa} isSelected={selectedTable == mesa.table_number} onClick={() => handleActiveSession(mesa.table_number)} angulo={angulosRotacion[mesa.id]} />


            ))}
        </div>
    ) : (
        <div className="carta-caja">
            <h1>Carta</h1>
        </div>




    );

}
export default Caja;




