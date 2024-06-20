import React, { useState, useEffect } from 'react';
import '../../styles/kitchenCard.css';
import PeopleIcon from '@material-ui/icons/People';
import { MdOutlineTableRestaurant } from "react-icons/md";
import { FaThumbtack } from "react-icons/fa6";
import { LuTimer } from "react-icons/lu";

const KitchenCard = ({ pedido, deleteOrder }) => {
    const [time, setTime] = useState(0);
    const [color, setColor] = useState("black");
    const [checkedItems, setCheckedItems] = useState({});
    const [message, setMessage] = useState(""); // Nuevo estado para el mensaje

    const handleCheckChange = (event) => {
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });

        const allChecked = Object.values(checkedItems).every(item => item);
        if (allChecked) {
            setMessage('comanda lista!'); // Establece el mensaje cuando todos los elementos estén marcados
        }
    };

    const handleCompleteClick = () => {
        // Verifica si todos los elementos están marcados
        const allChecked = Object.values(checkedItems).every(item => item);

        if (allChecked) {
            // completeOrder(pedido.id);
            deleteOrder(pedido.id);
            setMessage('comanda lista!'); // Establece el mensaje cuando se complete el pedido
        } else {
            // Si no todos los elementos están marcados, solo completa la orden
            completeOrder(pedido.id);
        }
    };

    useEffect(() => {
        if (time < 1500) {
            const timerId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setColor("red");
        }
    }, [time]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="kitchen-card">
            <div className="info-contenedor">
                <div className='iconos'>
                    <div className="info-linea"><p><FaThumbtack /> {pedido.id}</p></div>
                    <div className="info-linea"><p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M173-600h614l-34-120H208l-35 120Zm307-60Zm192 140H289l-11 80h404l-10-80ZM160-160l49-360h-89q-20 0-31.5-16T82-571l57-200q4-13 14-21t24-8h606q14 0 24 8t14 21l57 200q5 19-6.5 35T840-520h-88l48 360h-80l-27-200H267l-27 200h-80Z" /></svg> {pedido.table}</p></div>
                    <div className="info-linea"> <p><PeopleIcon /> {pedido.comensales}</p></div>
                </div>

                <div>
                    <ul>
                        {pedido.menu.map((item, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    name={item}
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
                </div>

                <div className='d-flex align-items-center justify-content-center g-3'><LuTimer />
                    <div className={`info-linea ${time >= 1500 ? 'text-red' : ''}`}>{formatTime(time)}</div>
                </div>

                <button className="completar boton-tarjeta" onClick={handleCompleteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5-156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                </button>

                {pedido.completed && <button className="borrar" onClick={() => deleteOrder(pedido.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>}

                {message && <div>{message}</div>}
            </div>
        </div >
    );
}

export default KitchenCard;