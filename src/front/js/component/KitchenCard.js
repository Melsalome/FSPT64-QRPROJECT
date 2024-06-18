
import React, { useState, useEffect } from 'react';
import '../../styles/kitchenCard.css';
// import TableBarIcon from '@material-ui/icons/TableBar';
import PeopleIcon from '@material-ui/icons/People';
import { MdTableBar } from "react-icons/md";
import { FaThumbtack } from "react-icons/fa6";
import { LuTimer } from "react-icons/lu";



const KitchenCard = ({ pedido }) => {


    const [time, setTime] = useState(60 * 60);
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
        <>

            <div className="kitchen-card">
                <h2><FaThumbtack /> {pedido.id}</h2>
                <p><MdTableBar /> {pedido.table}</p>
                <p><PeopleIcon /> {pedido.comensales}</p>
                {/* <p>Menú:</p> */}
                <ul>
                    {pedido.menu.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                    ))}
                </ul>
                <div style={{ textAlign: 'center', marginTop: '20%' }}><LuTimer /><h2>{formatTime(time)}</h2></div>
                {/* <p className="timer">Tiempo de preparación {Math.floor(time / 60)} minutos {time % 60} segundos</p> */}
                {/* <p className="timer">Tiempo de preparación: {pedido.preparationTime} minutos</p> */}


            </div>

        </>
    );
};

export default KitchenCard;

