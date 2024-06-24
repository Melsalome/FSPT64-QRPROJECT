import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom';
import "../../styles/invoice.css";

export const Invoice = () => {

    const { store, actions } = useContext(Context)
    const { restaurantId,tableId,invoiceId } = useParams()
    useEffect(() => {
      actions.getInvoice(restaurantId,tableId,invoiceId)
      }, [restaurantId,tableId,invoiceId]);
    
      const calculateTotals = (items) => {
        const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const tax = subtotal * 0.1; 
        const total = subtotal + tax;
        return { subtotal, tax, total };
      };
    
      const { subtotal, tax, total } = calculateTotals(store.invoices.flatMap(inv => inv.order_items));
    return (
      <div className='invoice-container'>
      <h2>Invoice Details</h2>
      {store.invoices.map((invoice) => (
        <div key={invoice.id} className='invoice-details'>
          <p>Invoice ID: {invoice.invoice_id}</p>
          <p>Restaurant ID: {invoice.restaurant_id}</p>
          <p>Table ID: {invoice.table_id}</p>
          {invoice.order_items.length > 0 ? (
            <div className="invoice-items">
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.order_items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="totals">
                <table>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Tax (10%)</td>
                      <td>${tax.toFixed(2)}</td>
                    </tr>
                    <tr className="total-row">
                      <td>Total</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No items found in this invoice.</p>
          )}
        </div>
      ))}
    </div>
      );
}