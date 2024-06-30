
import React from 'react';

const Facturas = () => {
    if (!tickets) {
        return <div>Cargando tickets...</div>;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id Ticket</th>
                        <th>Id Pedido</th>
                        <th>Table Number</th>
                        <th>Total Price</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.idTicket} onClick={() => onTicketClick(ticket)}>
                            <td>{ticket.idTicket}</td>
                            <td>{ticket.idPedido}</td>
                            <td>{ticket.tableNumber}</td>
                            <td>{ticket.totalPrice}</td>
                            <td>{ticket.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Facturas;

