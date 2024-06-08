
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/login.css";


const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	
	const handleLogin = async () => {
        await actions.getTokenLogin(email, password);
        // Check token after login attempt
        if (store.token && store.token !== "" && store.token !== undefined) {
            navigate("/");
        }
		
    };

    useEffect(() => {
        actions.syncTokenSessionStore();
        if (store.token && store.token !== "" && store.token !== undefined) {
            navigate("/");
        }
    }, [store.token, navigate]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	}

	return (
		<section>
			<div className="container">
				<div className="formulario inputlogin">
					{store.token && store.token != "" && store.token != undefined ? navigate("/") :( <>
					<form action="#">
						<h1>Iniciar Sesión</h1>
						
							<div className="input-container">
								<i className="fa-solid fa-envelope"></i>
								<input type="email" required value={email} onChange={(event) => { setEmail(event.target.value); }}></input>
								<label for="Email">Email</label>
							</div>

								<div className="input-container">
								<i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
								<input type={showPassword ? "text" : "password"} required value={password} onChange={(event) => { setPassword(event.target.value); }}></input>
									<label for="Contraseña">Contraseña</label>
								</div>

								<div className="olvidar">
									<label for="forgotPassword">
										<input type="checkbox"/> Recordar 
										<a href="#">Olvidé la contraseña</a>
									</label>
								</div>
						</form>

						<div>
							<button className="r6" onClick={handleLogin}>Acceder</button>

							<div className="registrar">
								<p>No tengo Cuenta <Link to ="/api/signup"> Crear una</Link></p>
							</div>
						</div>
						</>)
					}
					
				</div>
			</div>
		</section>
	);

};
export default Login


// import React, {useContext, useState, useEffect} from "react"
// import { useNavigate } from "react-router-dom"
// import { Context } from "../store/appContext";
// import "../../styles/home.css";

// const Login = () => {
// 	// contexto global, con useContext me traigo actions para aplicar las funciones que se encuentran en el store.
// 	const { store, actions } = useContext(Context);
// 	// estado de los inputs 
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	// navigate permite navegar a diferentes rutas programáticamente. Por ejemplo, si quieres redirigir al usuario a otra página después de un evento (como enviar un formulario), 
// 	const navigate = useNavigate();
	


// 	const handleLogin = () => {
// 		actions.getTokenLogin(email, password)
// 	}

// 	useEffect(() => {
// 		actions.syncTokenSessionStore();
// 		if (store.token && store.token !== "" && store.token !== undefined) {
// 			navigate("/");
// 		}
// 	}, [store.token, navigate]);

// 	return (
// 		<>
// 		<div className="inputlogin">
// 			<h1>Login</h1>
// 			{(store.token && store.token != "" && store.token != undefined) ? "You are logged in" + store.token : 
// 			<div>
// 			<input type="text" placeholder="email" value={email}  onChange={(event) => {setEmail(event.target.value)}}></input>
// 			<input type="password" placeholder="password" value={password} onChange={(event) => {setPassword(event.target.value)}}></input>
// 			<button onClick={handleLogin}>Login</button>
// 			</div> 
// 			}
// 		</div>
// 		</>
// 	);

// };
// export default Login

