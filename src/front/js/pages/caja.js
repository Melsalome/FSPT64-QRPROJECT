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
import mesagreen from "../../img/mesagreen.png"



const Caja = () => {
    const [largoSala, setLargoSala] = useState('600px');
    const [anchoSala, setAnchoSala] = useState('600px');
    const [mesas, setMesas] = useState([]);
    const [angulosRotacion, setAngulosRotacion] = useState({});
    const [mostrarCarta, setMostrarCarta] = useState(false);
    const {store, actions} = useContext(Context)
    // const [activeSession, setActiveSession] = useState({"id_table":1, "products": [{"product_name":""}]})
    const[activeSession, setActiveSession] = useState({ id_table: 1, products: [] })
    const recuperarEstado = () => {
        const largo = JSON.parse(localStorage.getItem('largoSala')) || '600px';
        const ancho = JSON.parse(localStorage.getItem('anchoSala')) || '600px';
        const mesasGuardadas = JSON.parse(localStorage.getItem('mesas')) || [];
        const angulosGuardados = JSON.parse(localStorage.getItem('angulosRotacion')) || {};


        // console.log(mesas, angulosRotacion, largo, ancho);
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

    useEffect(() => {
        recuperarEstado();
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

    const handleActiveSession = async(table_number) => {
       const data = await actions.getActiveSessionTable(table_number)
    //    console.log(data)
      setActiveSession(data)
    }
    
    useEffect( () => {
        // console.log(activeSession)
    }, [activeSession])

    return (
        <>
            <section>
                <div className="container-ticket">
                    <div className="botones-arriba">
                        <button onClick={irADashboard} className="boton-dash"><img src={iconoDash} alt="Atrás" style={{ width: '30px', height: '30px' }} /> Dashboard</button>
                        <button className="boton-atras" onClick={manejarClickAtras}><img src={iconoAtras} alt="Atrás" style={{ width: '20px', height: '20px' }} /> Atrás</button>

                    </div>
                    <div className="ticket">
                        <div className="ticket_table">
                            {
                                <div>
                                    <h2>Numero de Mesa: {activeSession.table_number}</h2>
                                    <h2>Productos:</h2>
                                    <ul>
                                    {/* {activeSession.products.map( (product) => {
                                       
                                       return <li>{product.product_name} x {product.quantity}</li> 
                                        // console.log(product.product_name)
                                    })} */}
                                      {activeSession.products && activeSession.products.length > 0 ? (
                                        activeSession.products.map((product, index) => (
                                            <li key={index}>{product.product_name} x {product.quantity}</li>
                                        ))
                                    ) : (
                                        <li>No hay productos</li>
                                    )}
                                    </ul>
                                   
                                    <h2></h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="botones">
                        <button className="boton-abrir-caja">Abrir caja<img src={iconoLlave} alt="Atrás" style={{ width: '35px', height: '35px' }} /> </button>


                        <button className="boton-pagar" >Pagar <br></br><img src={iconoPagar} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
                        <button className="boton-anadir" onClick={manejarClickAnadir}>Añadir <img src={iconoAnadir} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
                        <button className="boton-eliminar">Quitar <img src={iconoEliminar} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>


                    </div>
                </div>
                {!mostrarCarta ? (
                <div className="container-caja-mesas" style={{ backgroundImage: `url(${suelo})`, backgroundSize: '110px', backgroundPosition: 'center' }}>
                   { console.log(mesas[8],"hola")}
                    {mesas.map((mesa) => ( 
                        <div
                            key={mesa.id}
                            style={{
                                color: 'white',
                                position: 'absolute',
                                left: `${mesa.posicion.x}px`,
                                top: `${mesa.posicion.y}px`,
                            }}
                            className="mesa-container"
                        onClick={() => handleActiveSession(mesa.id)}>
                            <img
                                src={activeSession.status === 'active' && mesa.table_number == activeSession.table_number ? mesagreen : mesa.icono}
                                alt="Mesa"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    transform: `rotate(${angulosRotacion[mesa.id] || 0}deg)`,
                                    transition: 'transform 0.3s ease-in-out'
                                }}
                            />
                            <div className="numeroMesa">{mesa.table_number}</div>
                        </div>

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




