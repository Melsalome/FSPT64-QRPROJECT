import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Signup = () => {
const {store, actions} = useContext(Context)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [nameOfTheRestaurant, setNameOfTheRestaurant] = useState("")
const [disable, setDisable] = useState(false)

const handleSubmit = async (event) => {
    
    event.preventDefault();
   
    // Validaciones antes de enviar los datos
    if (!firstName || !lastName || !nameOfTheRestaurant || !email || !password){
        alert("All fields are required."); 
        setDisable(true)
        setDisable(false)
    } else {
        setDisable(false)
        await actions.getUserRegister(firstName,lastName,nameOfTheRestaurant,email,password);
    }

}
    return (
             <>
                 <div className="container_signup">
                    <form method="post">
                        <input className="container_signup_firstName" type="text" placeholder="Nombre" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                        <input className="container_signup_lastName" type="text" placeholder="Apellidos" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                        <input className="container_signup_nameOfTheRestaurant" type="text" placeholder="Nombre del Restaurante" value={nameOfTheRestaurant} onChange={(event) => setNameOfTheRestaurant(event.target.value)}></input>
                        <input className="container_signup_email" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        <input className="container_signup_password" type="password" placeholder="Contraseña" size="45" pattern="[a-z]{4,8}" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <button type="submit" disabled={disable} onClick={handleSubmit}>Register</button>
                     </form>
                </div>
    
    </>
)

}

export default Signup
