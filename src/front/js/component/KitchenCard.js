
import React, { useState, useEffect } from 'react';
import '../../styles/kitchenCard.css';
// import TableBarIcon from '@material-ui/icons/TableBar';
import PeopleIcon from '@material-ui/icons/People';



const KitchenCard = ({ pedido }) => {
    const [time, setTime] = useState(pedido.preparationTime * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            
                <div className="kitchen-card">
                    <h2>Nº comanda {pedido.id}</h2>
                    <p>Número de mesa {pedido.table}</p>
                    <p><PeopleIcon /> {pedido.comensales}</p>
                    {/* <p>Menú:</p> */}
                    <ul>
                        {pedido.menu.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                        ))}
                    </ul>
                    <p className="timer">Tiempo de preparación {Math.floor(time / 60)} minutos {time % 60} segundos</p>
                    {/* <p className="timer">Tiempo de preparación: {pedido.preparationTime} minutos</p> */}
                    
                </div>
           
        </>
    );
};

export default KitchenCard;

