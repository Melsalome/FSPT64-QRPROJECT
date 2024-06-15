import React from 'react';
import '../../styles/kitchenCard.css';

// const kitchenCard = ({pedidos}) => {
//     // const { id, table, menu, comensales, preparationTime } = order;

//     return (
//         <>
//         {pedidos.map((pedido)=> {
//             <div className="kitchen-card">
//             <h2>Comanda {id}</h2>
//             <p>Número de mesa: {table}</p>
//             <p>Número de comensales: {comensales}</p>
//             <p>Menú:</p>
//             <p>Tiempo de preparación: {preparationTime} minutos</p>
//         </div>
//             <li key={index}>{item}</li>
//         }
//         ))
//       </>
//     );
// };

// export default kitchenCard;

const KitchenCard = ({ pedidos }) => {
    return (
        <>
            {pedidos.map((pedido, index) => (
                <div key={index} className="kitchen-card">
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
            ))}
        </>
    );
};

export default KitchenCard;