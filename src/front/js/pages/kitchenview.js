import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/kitchenview.css";
import { Navigate, useNavigate } from "react-router-dom";
import KitchenCard from "../component/kitchenCard";


const KitchenView = () => {
const {store, actions} = useContext(Context)
const [pedidos, setPedidos] = useState([
    { 
        id: 1,
        table: 2,
        menu: [
           "pulpo a la gallega", "gazpacho", "brownie"
        ],
        comensales: 3,
        completed: false
    },
    { 
        id: 2,
        table: 3,
        menu: [
           "pizza napolitana", "sopa", "tarta de limón"
        ],
        comensales: 1,
        completed: false
    },
    {
      id:3,
      table: 6,
      menu: [
        "ensalada", "raxo con patatas", "tiramisú"
      ],
      comensales: 4,
      completed: false
    },
    {
      id:4,
      table: 9,
      menu: [
        "revuelto de setas", "cachopo", "fresas con nata"
      ],
      comensales: 3,
      completed: false
    },
    {
      id:5,
      table: 5,
      menu: [
        "ensaladilla", "churrasco de cerdo", "coulant de chocolate"
      ],
      comensales: 4,
      completed: false
    },
    {
      id:6,
      table: 8,
      menu: [
        "sopa de verduras", "bacalao al pil pil", "tarta de queso"
      ],
      comensales: 5,
      completed: false
    },
    {
      id:7,
      table: 8,
      menu: [
        "sopa de verduras", "bacalao al pil pil", "tarta de queso"
      ],
      comensales: 2,
      completed: false
    },
    {
      id:8,
      table: 8,
      menu: [
        "sopa de verduras", "bacalao al pil pil", "tarta de queso"
      ],
      comensales: 1,
      completed: false
    },

]);

const completeOrder = (id) => {
    setPedidos(pedidos.map(pedido => 
        pedido.id === id ? {...pedido, completed: true} : pedido
    ));
}

const deleteOrder = (id) => {
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
}

return (
    <div className="container1">
      
      {pedidos.map(pedido => (
        <div  className="pedidos" key={pedido.id}>
          <KitchenCard pedido={pedido} /> 
          {/* <p style={{ textDecoration: pedido.completed ? 'line-through' : 'none' }}>{pedido.menu}</p> */}
          <button className="completar" onClick={() => completeOrder(pedido.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
          {pedido.completed && <button className="borrar" onClick={() => deleteOrder(pedido.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>}
        </div>
      ))}
    </div>
  );
}

export default KitchenView;