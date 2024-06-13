import React from 'react';
import '../../styles/kitchenCard.css';
const kitchenCard = ({ order }) => {
    const { id, table, menu, comensales, preparationTime } = order;

    return (
        <div className="kitchen-card">
            <h2>Comanda {id}</h2>
            <p>Número de mesa: {table}</p>
            <p>Número de comensales: {comensales}</p>
            <p>Menú:</p>
            <ul>
                {menu.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p>Tiempo de preparación: {preparationTime} minutos</p>
        </div>
    );
};

export default kitchenCard;