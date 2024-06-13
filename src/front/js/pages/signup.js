import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Navigate, useNavigate } from "react-router-dom";
import Login from './login';

const Signup = () => {
const {store, actions} = useContext(Context)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [validatedPassword, setValidatedPassword] = useState("")
const [restaurantName, setRestaurantName] = useState([
    "Restaurante A",
    "Restaurante B",
    "Restaurante C",
    "Restaurante D"
])
const [selectedRestaurant, setSelectedRestaurantName] = useState("Restaurante A")
const [showPassword, setShowPassword] = useState(false);
const [registerStatus, setRegisterStatus] = useState()
const Navigate = useNavigate()



const handleSubmit = async (event) => {
    event.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!selectedRestaurant || !firstName || !lastName || !email || !password) {
        alert("All fields are required.");
    } else if (!emailRegex.test(email)) {
        alert("El email es incorrecto.");
    } else if (password.length < 8 || password.length > 12) {
        alert("La contraseña debe tener entre 8 y 12 caracteres.");
    } else {
       const data = await actions.getUserRegister(selectedRestaurant, firstName, lastName, email, password);
       setRegisterStatus(data[0].status)
    }
}

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}

const handleOnClick = () => {
    Navigate("/app/login")
}

const handleSelectChange = (event) => {
    setSelectedRestaurantName(event.target.value)
   
}

    return (
             <>
              <section>
                {registerStatus === "ok"? (  <div class="container2">
            <div class="content">
                <h1>USUARIO REGISTRADO CON ÉXITO!</h1>
                <button onClick={handleOnClick}>Ir a Login</button>
            </div>
        </div>
                           ) :
                            
                       <div className="container">
                       <div className="formulario inputlogin">
                           <form action="#">
                               <h1>Sign up</h1>
                               <div className="input-container">
                               <i className="fa-solid fa-utensils"></i>
                               {/* <label htmlFor="restaurant-dropdown">Select a restaurant: </label> */}
                                <select className="restaurant-dropdown" value={selectedRestaurant} onChange={handleSelectChange}>
                                    <option value="" disabled >Selecciona un Restaurante</option>
                                    {restaurantName.map((name, index) => (<option key={index} value={name} onChange={handleSelectChange}>
                                        {name}</option>))}</select>
                                       </div>
                               <div className="input-container">
                               <i className="fa-solid fa-user"></i>
                                       <input type="text"  value={firstName} onChange={(event) => { setFirstName(event.target.value); }} required></input>
                                       <label for="#">Nombre</label>
                               </div>
                               <div className="input-container">
                               <i className="fa-regular fa-user"></i>
                                       <input type="text"  value={lastName} onChange={(event) => { setLastName(event.target.value); }} required></input>
                                       <label for="#">Apellidos</label>
                               </div>
                                   <div className="input-container">
                                       <i className="fa-solid fa-envelope"></i>
                                       <input type="text, email" value={email} onChange={(event) => { setEmail(event.target.value); }} required></input>
                                       <label for="email">Email</label>
                                   </div>
                                      
                                   {/* <div className="input-container password">
                                       <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                                       <input type={showPassword ? "text" : "password"}  minLength="8" maxLength="12" value={password} onChange={(event) => { setPassword(event.target.value); }} required></input>
                                           <label for="#">Contraseña</label>
                                       </div> */}
                                    <div className="input-container password">
								        <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
								        <input type={showPassword ? "text" : "password"}  value={password} onChange={(event) => { setPassword(event.target.value); }} required></input>
									        <label for="Contraseña">Contraseña</label>
								        </div>
                                      
                               </form>
                               <div className="register-button">
                                   <button className="r6" onClick={handleSubmit}>Registro</button>
                                   <p className="">Ya tienes una cuenta? <Link to="/app/login">Inicia Sesión</Link></p>
                               </div>
                              
                           
                       </div>
                   </div>
               
                }
                </section>
     
    
                        
    </>
)

}


export default Signup