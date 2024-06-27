import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../../styles/dashboard.css";
import mesasImage from '../../img/mesas.png';
import menu from "../../img/menu.png";
import factura from "../../img/factura.png";
import ajustes from "../../img/ajustes.png";
import pantone from "../../img/pantone.png";
import cajero from "../../img/cajero.png";
import { Context } from "../store/appContext";

const Dashboard = () => {
    const {actions, store} = useContext(Context)
   
    
    return (
        <>
            <section>
                <div className="container-dashboard">
                    <h1>Dashboard</h1>
                    <div className="iconos-dashboard">
                        <div className="icono">
                            <Link to="../app/mesas">
                                <img src={mesasImage} alt="Mesas" style={{ cursor: 'pointer', width: '100px', height: '100px' }} />
                            </Link>
                            <p>Mesas</p>
                        </div>
                        <div className="icono">
                            <Link to="../app/caja">
                            <img src={cajero} alt="Caja" style={{ cursor: 'pointer', width: '100px', height: '100px' }} />
                            </Link>
                            <p>Caja</p>
                        </div>
                        <div className="icono">
                            <Link to="../app/adminmenu">
                            <img src={menu} alt="Carta" style={{ cursor: 'pointer', width: '100px', height: '100px' }} />
                            </Link>
                            <p>Carta</p>
                        </div>
                    </div>
                    <div className="iconos-dashboard">
                        <div className="icono">
                            <img src={ajustes} alt="Configuracion" style={{ cursor: 'pointer', width: '100px', height: '100px' }} />
                            <p>Configuración</p>
                        </div>
                        <div className="icono">
                            <Link to ="../restaurants/1/tables/1/menu">
                            <img src={pantone} alt="Estilos" style={{ cursor: 'pointer', width: '100px', height: '100px' }} />
                            </Link>
                            <p>Estilos</p>
                        </div>
                        <div className="icono">
                            <img src={factura} alt="Facturacion" style={{ cursor: 'pointer', width: '100px', height: '100px' }} />
                            <p>Facturación</p>
                        </div>
                    </div>
                </div>
                <button className="containerHome" onClick={() => actions.handleLogOut() }>Log out</button>
            </section>
           
		

        </>
    );
};

export default Dashboard;



