import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/kitchenview.css";
import { Navigate, useNavigate } from "react-router-dom";
import KitchenCard from "../component/kitchenCard";


const kitchenview = () => {
const {store, actions} = useContext(Context)
const pedidos = [
    { 
        id: 1,
        table: 2,
        menu: [
           "pulpo a la gallega", "gazpacho", "brownie"
           
        ],
        comensales: 3
   
       },

    //    { 
    //     id: 2,
    //     table: 3,
    //     menu: [
    //        "pizza napolitana", "sopa", "tarta de limón"
           
    //     ],
    //     comensales: 4
   
    //    },
       
       
]

return (
    <div className="container1">
        <p>hola</p>
      {pedidos.map(pedido => (
        <div key={pedido.id}>
          <KitchenCard pedido={pedido} /> 
          <p style={{ textDecoration: pedido.completed ? 'line-through' : 'none' }}>{pedido.menu}</p>
          <button onClick={() => completeOrder(pedido.id)}>Completar pedido</button>
          {pedido.completed && <button onClick={() => deleteOrder(pedido.id)}>Borrar comanda</button>}
        </div>
      ))}
    </div>
  );

}
export default kitchenview