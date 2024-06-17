import React from 'react';
import '../../styles/kitchenCard.css';


const KitchenCard = ({ pedido }) => {
    return (
        <>
            
                <div className="kitchen-card">
                    <h2>Comanda {pedido.id}</h2>
                    <p>Número de mesa: {pedido.table}</p>
                    <p>Número de comensales: {pedido.comensales}</p>
                    {/* <p>Menú:</p> */}
                    <ul>
                        {pedido.menu.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                        ))}
                    </ul>
                    <p>Tiempo de preparación: {pedido.preparationTime} minutos</p>
                    
                </div>
           
        </>
    );
};

export default KitchenCard;

