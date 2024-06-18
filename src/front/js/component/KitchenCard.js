import React, { useState, useEffect } from 'react';
import '../../styles/kitchenCard.css';
import PeopleIcon from '@material-ui/icons/People';
// import { MdTableBar } from "react-icons/md";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { FaThumbtack } from "react-icons/fa6";
import { LuTimer } from "react-icons/lu";

const KitchenCard = ({ pedido }) => {
    const [time, setTime] = useState(60 * 60);
    const [checkedItems, setCheckedItems] = useState({});

    const allChecked = Object.values(checkedItems).every(item => item);
    const handleCompleteClick = () => {
        // Verifica si todos los elementos están marcados
        const allChecked = Object.values(checkedItems).every(item => item);

        if (allChecked) {
            // Si todos los elementos están marcados, completa y elimina la orden
            completeOrder(pedido.id);
            deleteOrder(pedido.id);
        } else {
            // Si no todos los elementos están marcados, solo completa la orden
            completeOrder(pedido.id);
        }
    };

    const handleCheckChange = (event) => {
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        if (time > 0) {
            const timerId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [time]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? 0 : ""}${secs}`;
    };

    return (
        <div className="kitchen-card">
            <div className="info-contenedor">
                <div className="info-linea"><h2><FaThumbtack /> {pedido.id}</h2></div>
                <div className="info-linea"><p><MdOutlineTableRestaurant /> {pedido.table}</p></div>
                <div className="info-linea"> <p><PeopleIcon /> {pedido.comensales}</p></div>
            </div>
            <ul>
                {pedido.menu.map((item, itemIndex) => (
                    <li key={itemIndex}>
                        <input
                            type="checkbox"
                            name={item}
                            className="miCheckbox"
                            checked={checkedItems[item] || false}
                            onChange={handleCheckChange}
                        />
                        <span style={{
                            textDecoration: checkedItems[item] ? 'line-through' : 'none',
                            textDecorationColor: checkedItems[item] ? 'green' : 'initial'
                        }}></span>
                        {item}
                    </li>
                ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20%' }}>
                <LuTimer /><h2>{formatTime(time)}</h2>
            </div>
            {/* <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <LuTimer /><h2>{formatTime(time)}</h2>
            </div> */}
            <button className="completar boton-tarjeta" onClick={handleCompleteClick}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></button>
            {pedido.completed && <button className="borrar" onClick={() => deleteOrder(pedido.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>}
        </div>
    );
};

export default KitchenCard;