import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [isMounted, setIsMounted] = useState(true)
	
	
	const redirectToLogin = () => {
		actions.handleLogOut();
		// logOut()
		navigate("/app/login")
	}


	return (
		<>
		
		<button className="containerHome" onClick={() => redirectToLogin() }>Log out</button>
		</>
		
	);
};
