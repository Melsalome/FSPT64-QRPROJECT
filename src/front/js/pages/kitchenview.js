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
        comensales: 4,
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
      comensales: 4,
      completed: false
    },
    {
      id:5,
      table: 5,
      menu: [
        "ensaladilla", "churrasco de cerdo", "coulant de chocolate"
      ],
    },
    {
      id:6,
      table: 8,
      menu: [
        "sopa de verduras", "bacalao al pil pil", "tarta de queso"
      ],
    },
    {
      id:6,
      table: 8,
      menu: [
        "sopa de verduras", "bacalao al pil pil", "tarta de queso"
      ],
    },
    {
      id:6,
      table: 8,
      menu: [
        "sopa de verduras", "bacalao al pil pil", "tarta de queso"
      ],
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
          <button className="completar" onClick={() => completeOrder(pedido.id)}>Completar pedido</button>
          {pedido.completed && <button className="borrar" onClick={() => deleteOrder(pedido.id)}>Borrar comanda</button>}
        </div>
      ))}
    </div>
  );
}

export default KitchenView;