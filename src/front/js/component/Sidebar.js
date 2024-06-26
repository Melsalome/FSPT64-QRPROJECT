import React, { useContext, useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";
import { Context } from "../store/appContext";
import iconoExit from "../../img/exit.png";
import iconoCaja from "../../img/caja-dash.png";
import iconoQR from "../../img/qr-dash.png";
import iconoAjustes from "../../img/dash.png";
import iconoMenu from "../../img/menu_dash.png";
import iconoBilling from "../../img/billing-dash.png";
import iconoTable from "../../img/table1.png";
import iconoAbout from "../../img/about.png";

export const Sidebar = () => {
	const { actions } = useContext(Context);
    const navigate = useNavigate()
    const redirectToLogin = () => {
        actions.handleLogOut();
        // logOut()
        navigate("/app/login")
    }

	return (
		<>
		<header className="side-header">
		<Link to="../app/caja" className="link-no-decoration">
		<button className={`side cash-btn ${location.pathname === "/app/caja" ? "active" : ""}`}>Cash<img src={iconoCaja} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>
		</Link>
		<Link to="../app/mesas" className="link-no-decoration">
		<button className={`side tables-btn ${location.pathname === "/app/mesas" ? "active" : ""}`}>Tables<img src={iconoTable} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>
		</Link>
		<Link to="../app/adminmenu" className="link-no-decoration">
		{/* <button className="side menu-btn">Menu<img src={iconoMenu} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button> */}
		<button className={`side menu-btn ${location.pathname === "/app/adminmenu" ? "active" : ""}`}>Menu<img src={iconoMenu} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>
		
		</Link>
		{/* <button className="side settings-btn">Settings<img src={iconoAjustes} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button> */}
		<button className={`side settings-btn ${location.pathname === "/app/settings" ? "active" : ""}`}>Settings<img src={iconoAjustes} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>
		
		<Link to="../app/generate-qr" className="link-no-decoration">
		{/* <button className="side qr-btn">QR Codes<img src={iconoQR} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button> */}
		<button className={`side qr-btn ${location.pathname === "/app/generate-qr" ? "active" : ""}`}>QR Codes<img src={iconoQR} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>

		</Link>
		{/* <button className="side billing-btn">Billing<img src={iconoBilling} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>	 */}
		<button className={`side billing-btn ${location.pathname === "/app/billing" ? "active" : ""}`}>Billing<img src={iconoBilling} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>
		
		<Link to="../app/about-us" className="link-no-decoration">
		{/* <button className="side about-btn">AboutUs<img src={iconoAbout} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button> */}
		<button className={`side about-btn ${location.pathname === "/app/about-us" ? "active" : ""}`}>About us<img src={iconoAbout} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>
		
		</Link>
		<button className="side logout-btn" onClick={() => redirectToLogin()}>LogOut<img src={iconoExit} alt="Atrás" style={{ width: '30px', height: '30px' , marginLeft: '5px'}} /></button>	
		</header>
		</>

	);
};
