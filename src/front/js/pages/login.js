import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const [token, setToken] = useState();

    const handleLogin = async (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            alert("All fields are required.");
        } else if (!emailRegex.test(email)) {
            alert("Email is incorrect.");
        } else if (password.length < 8 || password.length > 12) {
            alert("Password must be between 8 and 12 characters.");
        } else {
            const result = await actions.getTokenLogin(email, password);
            if (result.success) {
                navigate("/app/caja");
                setToken(localStorage.getItem("token"));
            } else {
                alert(result.message || "Usuario o contraseña incorrectos.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSectionCreateAccount = () => {
        navigate("/app/signup");
    };

    return (
        <>
            <section>
                <div className="container-login">
                    <div className="formulario inputlogin">
                        <form action="#" method="POST">
                            <h1>Login</h1>
                            
                            <div className="input-container">
                                <i className="fa-solid fa-envelope"></i>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                ></input>
                                <label htmlFor="Email">Email</label>
                            </div>

                            <div className="input-container password">
                                <i
                                    className={`fa-solid ${showPassword ? "fa-lock-open" : "fa-lock"}`}
                                    onClick={togglePasswordVisibility}
                                ></i>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                ></input>
                                <label htmlFor="Contraseña">Password</label>
                            </div>

                            <div className="olvidar">
                                <label htmlFor="forgotPassword">
                                    <input type="checkbox" /> Remember me
                                </label>
                            </div>
                        </form>

                        <div className="access-container">
                            <button className="r6" onClick={handleLogin}>
                                Access
                            </button>

                            <div className="registrar">
                                <p>Not have an account ?</p>
                                <button onClick={handleSectionCreateAccount}>
                                    Create account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

};

export default Login;





