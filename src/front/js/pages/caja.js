import React, { useContext, useEffect, useState, useRef } from "react";
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
import iconoCard from "../../img/card1.png";
import iconoMoney from "../../img/money1.png";
import iconoDash from "../../img/dash.png";
import suelo from "../../img/suelo506.png";
import { Context } from "../store/appContext";
import Mesa from "../component/Mesa";
import mesagreen from "../../img/mesagreen.png"


const Caja = () => {
    const [largoSala, setLargoSala] = useState('600px');
    const [anchoSala, setAnchoSala] = useState('600px');
    const [mesas, setMesas] = useState([]);
    const [angulosRotacion, setAngulosRotacion] = useState({});
    const [mostrarCarta, setMostrarCarta] = useState(false);
    const [mostrarCalculadora, setMostrarCalculadora] = useState(false);
    const { store, actions } = useContext(Context)
    const [activeSession, setActiveSession] = useState({ id_table: 1, products: [] })
    const [loading, setLoading] = useState(true)
    const [selectedTable, setSelectedTable] = useState(null)
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [productPrices, setProductPrices] = useState([]);
    const [paidAmount, setPaidAmount] = useState(0);
    const totalToPay = activeSession.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const navigate = useNavigate();
    const payInputRef = useRef(null);
    const [isSessionClosed, setIsSessionClosed] = useState(false)
    const [tableList, setTableList] = useState([])

    const recuperarEstado = async () => {
        const largo = JSON.parse(localStorage.getItem('largoSala')) || '600px';
        const ancho = JSON.parse(localStorage.getItem('anchoSala')) || '600px';
        const angulosGuardados = JSON.parse(localStorage.getItem('angulosRotacion')) || {};
        setLargoSala(largo);
        setAnchoSala(ancho);
        const data = await actions.getTableList()
        setTableList(data)
       
       
        setAngulosRotacion(angulosGuardados);
    };


    const manejarClickAnadir = () => {
        setMostrarCarta(true);
        setMostrarCalculadora(false);
        resetPaidAmount();
    };

    const manejarClickAtras = () => {
        setMostrarCarta(false);
        setMostrarCalculadora(false);
        resetPaidAmount();
    };

    const manejarClickPagar = () => {
        setMostrarCalculadora(true);
        setMostrarCarta(false);
        resetPaidAmount();
    };

    const abrirCaja = () => {
        alert("Cash Box Opened!");
    };

    const fetchProductPrices = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/app/products');
            const data = await response.json();
            setProductPrices(data);
        } catch (error) {
            console.error("Error fetching product prices:", error);
        }
    };

    const handlePaidAmountChange = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setPaidAmount(value);
        } else {
            setPaidAmount(0);
        }
    };

    const resetPaidAmount = () => {
        setPaidAmount(0);
        if (payInputRef.current) {
            payInputRef.current.value = "";
        }
    };

    const change = paidAmount - totalToPay;

    useEffect(() => {
        const fetchData = async () => {
            recuperarEstado();
            await fetchProductPrices();
            await handleActiveSessionList();
            setLoading(false);
        };
        console.log(store.tableList)
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

    // const handleActiveSession = async (table_number) => {
    //     const data = await actions.getActiveSessionTable(table_number);
    //     if (!data.products || !Array.isArray(data.products)) {
    //         setActiveSession({ id_table: table_number, products: [] });
    //         return;
    //     }
    const handleActiveSession = async (table_number) => {
        const data = await actions.getActiveSessionTable(table_number);
        if (!data.products || !Array.isArray(data.products)) {
            setActiveSession({ table_number: table_number, products: [] });
            return;
        }



        const productsWithPrices = data.products.map(product => {
            const productDetails = productPrices.find(p => p.id === product.id_product);
            return {
                ...product,
                price: productDetails ? productDetails.price : null
            };
        });

        const groupedProducts = productsWithPrices.reduce((acc, product) => {
            if (!acc[product.id_product]) {
                acc[product.id_product] = { ...product };
            } else {
                acc[product.id_product].quantity += product.quantity;
            }
            return acc;
        }, {});

        // setActiveSession({ ...data, products: Object.values(groupedProducts) });
        setActiveSession({ table_number: table_number, products: Object.values(groupedProducts) });
    };

    const handleActiveSessionList = async () => {
        const dataSessionList = await actions.getActiveSessionList();
        setMesas(prevMesas =>
            prevMesas.map((mesa) => {
                const isActive = dataSessionList.some(session => session.status == 'active' && session.table_number == mesa.table_number);
                return { ...mesa, isActive };
            })
        );
    };

    const handleCloseSession = async (table_number) => {
        const closedSession = await actions.closeActiveSession(table_number)
        console.log(closedSession)
        setIsSessionClosed(true)
    }

    const handleMesaClick = (id) => {
        setMesaSeleccionada(id);
    };

    const handleDeselect = () => {
        setSelectedTable(null);
        setMesaSeleccionada(null);
    };

    const handleClickOutside = (event) => {

        if (!event.target.closest('.mesa-container')) {
            handleDeselect();
        }
    };

    const handleKeyPress = (key) => {
        if (key === '⌫') {

            payInputRef.current.value = payInputRef.current.value.slice(0, -1);
        } else {
            payInputRef.current.value += key;
        }


        handlePaidAmountChange({ target: { value: payInputRef.current.value } });
    };

    const formattedChange = (change) => {
        if (change < 0 && change > -0.005) {
            return "0.00";
        }
        return change.toFixed(2);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleActiveSessionList();
        }, 300000);

        // OJO, TIEMPO DE ACTUALIZAR

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (mostrarCalculadora && payInputRef.current) {
            payInputRef.current.focus();
        }
    }, [mostrarCalculadora]);

    return (
        <>
            <section>
                <h1 className='section-mesas-tittle'>Cash</h1>
                <div className="container-ticket">
                    <div className="botones-arriba">
                        <button className="boton-atras" onClick={manejarClickAtras}><img src={iconoAtras} alt="Atrás" style={{ width: '20px', height: '20px' }} /> Back</button>

                    </div>
                    <div className="ticket">
                        <div className="ticket_table">
                            {
                                <div className="ticket-view">

                                    <h5> Table number: <strong> {activeSession.table_number}</strong></h5>
                                    {/* <h5> Items: ✍</h5> */}
                                    {/* <ul> */}

                                    {isSessionClosed || activeSession.products && activeSession.products.length > 0 ? (
                                        <>
                                            {activeSession.products.map((product, index) => (
                                                <div className="div-product" key={index}>
                                                    <div className="product--name">{product.product_name}</div>
                                                    <div className="product-qty">{product.quantity}</div>
                                                    {/* <div className="product-price">${product.price ? product.price.toFixed(2) : "0.00"}</div> */}
                                                    <div className="product-total"><div className="divisa"> $</div>{(product.price * product.quantity).toFixed(2)}</div>
                                                </div>))}
                                            <button onClick={() => handleCloseSession(activeSession.table_number)}>Close Session</button>
                                        </>
                                        ) : (
                                        <div className="empty-table-message">▶ Empty table ◀</div>
                                        )}
                                    {/* </ul> */}
                                </div>
                            }
                            <h2></h2>
                            <div className="total--price">
                                <div className="total--price-tittle">Total:</div>
                                <div className="total--price-amount">${totalToPay.toFixed(2)}</div>
                            </div>


                        </div>
                    </div>
                    <div className="botones">
                        <button onClick={abrirCaja} className="boton-abrir-caja">Open Cash<img src={iconoLlave} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
                        <button className="boton-pagar" onClick={manejarClickPagar}>Pay <br /><img src={iconoPagar} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
                        <button className="boton-anadir" onClick={manejarClickAnadir}>Add <img src={iconoAnadir} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
                        <button className="boton-eliminar">Delete <img src={iconoEliminar} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>


                    </div>
                </div>


                {!mostrarCarta && !mostrarCalculadora ? (



                    <div className="container-caja-mesas" style={{ backgroundImage: `url(${suelo})`, backgroundSize: '110px', backgroundPosition: 'center' }}>
                        <div className="loader" style={{ visibility: loading ? 'visible' : 'hidden' }}><span>Loading tables status</span>
                            <div className="progress"></div>
                        </div>
                        {tableList.map((mesa) => (
                            <Mesa
                                key={mesa.id}
                                mesa={mesa}
                                isSelected={selectedTable === mesa.table_number || mesaSeleccionada === mesa.id}
                                onDeselect={handleDeselect}
                                onClick={() => {
                                    handleActiveSession(mesa.table_number);
                                    handleMesaClick(mesa.id);
                                }}
                                angulo={angulosRotacion[mesa.id]}
                            />
                        ))}
                    </div>
                ) : mostrarCarta ? (
                    <div className="carta-caja">
                        <h1>Carta</h1>
                    </div>
                ) : (
                    <div className="container-calculadora">
                        <div className="calculadora">
                            <div className="calculadora-total">
                                <div className="to-pay">
                                    <h2>To Pay:</h2>
                                    <h3>{activeSession.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</h3>
                                </div>
                                <div className={`to-change ${change < -0.001 ? 'negative' : ''}`}>
                                    <h2>Change:</h2>
                                    <h3>{formattedChange(change)}</h3>
                                </div>
                                <div className="to-paid">
                                    <h2>Paid:</h2>
                                    <div className="dollar-group">

                                        <input className="pay-input" type="text" onChange={handlePaidAmountChange} ref={payInputRef} />
                                    </div>
                                </div>
                                <div className="teclado">
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((key) => (
                                        <button key={key} className="teclado-btn" onClick={() => handleKeyPress(key)}>
                                            {key}
                                        </button>
                                    ))}
                                </div>
                                <div className="botones-pagar">
                                    <button className="boton-cash">Cash <br /><img src={iconoMoney} alt="Atrás" style={{ width: '50px', height: '50px' }} /></button>
                                    <button className="boton-card">Credit Card <br /><img src={iconoCard} alt="Atrás" style={{ width: '50px', height: '50px' }} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};


export default Caja;





