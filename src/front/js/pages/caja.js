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



const Caja = () => {
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

   

    return (
        <>
            <section>
            <h1 className='section-mesas-tittle'>Cash</h1>
                <div className="container-ticket">
                    <div className="botones-arriba">
                        {/* <button onClick={irADashboard} className="boton-dash"><img src={iconoDash} alt="Atrás" style={{ width: '30px', height: '30px' }} /> Dashboard</button> */}
                        <button className="boton-atras" onClick={manejarClickAtras}><img src={iconoAtras} alt="Atrás" style={{ width: '20px', height: '20px' }} /> Back</button>

                    </div>
                    <div className="ticket">
                        <div className="ticket_table">
                            {
                                <div className="ticket-view">
                                    <h5> Table number: {activeSession.table_number}</h5>
                                    <h5> Items: ✍</h5>
                                    <ul>
                                        {activeSession.products && activeSession.products.length > 0 ? (
                                            activeSession.products.map((product, index) => (
                                                <li key={index}>{product.product_name} x {product.quantity}</li>
                                            ))
                                        ) : (
                                            <li>Empty.</li>
                                        )}
                                    </ul>

                                    <h2></h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="botones">
                        <button onClick={abrirCaja} className="boton-abrir-caja">Open Cash<img src={iconoLlave} alt="Atrás" style={{ width: '35px', height: '35px' }} /> </button>
                        <button className="boton-pagar" >Pay <br></br><img src={iconoPagar} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
                        <button className="boton-anadir" onClick={manejarClickAnadir}>Add <img src={iconoAnadir} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
                        <button className="boton-eliminar">Delete <img src={iconoEliminar} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>


                    </div>
                </div>
                {!mostrarCarta ? (
                    <div className="container-caja-mesas" style={{ backgroundImage: `url(${suelo})`, backgroundSize: '110px', backgroundPosition: 'center' }}>
                        {mesas.map((mesa) => (
                            <Mesa key={mesa.id} mesa={mesa} isSelected={selectedTable == mesa.table_number} onClick={() => handleActiveSession(mesa.table_number)} angulo={angulosRotacion[mesa.id]}/>
                            // <div
                            //     key={mesa.id}
                            //     style={{
                            //         color: 'white',
                            //         position: 'absolute',
                            //         left: `${mesa.posicion.x}px`,
                            //         top: `${mesa.posicion.y}px`,
                            //         visibility: loading ? 'hidden' : 'visible'
                            //     }}
                            //     className="mesa-container"
                            //     onClick={() => handleActiveSession(mesa.table_number)}>
                            //     <img
                            //         src={mesa.isActive ? mesagreen : mesa.icono}
                            //         alt="Mesa"
                            //         style={{
                            //             width: '60px',
                            //             height: '60px',
                            //             transform: `rotate(${angulosRotacion[mesa.id] || 0}deg)`,
                            //             transition: 'transform 0.3s ease-in-out'
                            //         }}
                            //     />
                            //     <div className="numeroMesa">{mesa.table_number}</div>
                            // </div>

                        ))}
                    </div>
                ) : (
                    <div className="carta-caja">
                        <h1>Carta</h1>
                    </div>
                )}
            </section>
        </>
    );
};

export default Caja;




