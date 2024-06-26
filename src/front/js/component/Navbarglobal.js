import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './../pages/testing-qr';
import { KitchenList } from './../pages/KitchenList';
import "../../styles/navbarglobal.css"



const Navbarglobal = () => {
    const Navigate = useNavigate()
    return (
    <>
    <div className='containernavbarglobal'>
        <button onClick={() => Navigate("/app/dashboard")}>Dashboard</button>
        <button onClick={() => Navigate("/restaurants/1/tables/9/menu")}>Menu Client</button>
        <button onClick={() => Navigate("/restaurants/1/orders")}>KitchenList</button>
        <button onClick={() => Navigate("/app/caja")}>Caja</button>
        
    </div>
    
    </>
    )
}

export default Navbarglobal