
// src/pages/Facturasview.js
import React, { useState, useEffect } from 'react';
import { dispatcherInvoice } from '../store/dispatcherInvoice';
import "../../styles/Facturasview.css";

const Billing = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await dispatcherInvoice.getTickets();
                setTickets(response);
                setFilteredTickets(response);
            } catch (error) {
                console.error('Error al obtener los tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const handleFilterChange = (event) => {
        setFilterDate(event.target.value);
        if (event.target.value === '') {
            setFilteredTickets(tickets);
        } else {
            setFilteredTickets(tickets.filter(ticket => ticket.fecha === event.target.value));
        }
    };

    const onTicketClick = (ticket) => {
        console.log('Ticket seleccionado:', ticket);
    };

    if (!tickets.length) {
        // return <div>Cargando tickets...</div>;


        return (
            <section className="section">
                <div className='billings-container'>
                    <div className='h1-date'>
                        <h1 className='tittle'>Billings</h1>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={handleFilterChange}
                            placeholder="Filtrar por fecha"
                            style={{ marginBottom: '20px' }}

                        />
                    </div>
                    <div className="table-container">
                        <table style={{ width: '60%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #000' }}>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}> Ticket id</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Order id</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Table number</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total price</th>
                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.idTicket} onClick={() => onTicketClick(ticket)} style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.Ticketid}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.Orderid}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.tableNumber}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.totalPrice}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div >
                </div>
            </section>
        );
    };
}

export default Billing;
