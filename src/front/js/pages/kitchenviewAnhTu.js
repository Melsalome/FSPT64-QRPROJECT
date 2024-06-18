import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
// import { OrderCard } from '../component/OrderCard';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/KitchenAnhTu.css";

export const KitchenAnhTu = () => {
  const { store, actions } = useContext(Context)
  const { restaurantId } = useParams();
  const [completedItems, setCompletedItems] = useState([]);
  useEffect(() => {

    if (restaurantId) {
      actions.getOrder(restaurantId);
    }
  }, [restaurantId]);
  const toggleItemCompleted = (orderId, itemId) => {
    const updatedCompletedItems = [...completedItems];
    const itemIndex = completedItems.findIndex((item) => item.orderId === orderId && item.itemId === itemId);

    if (itemIndex === -1) {
      updatedCompletedItems.push({ orderId, itemId });
    } else {
      updatedCompletedItems.splice(itemIndex, 1);
    }

    setCompletedItems(updatedCompletedItems);
  };

  return (
    //     <div className="kitchen-list">
    //   {store?.orders.map((order) => (
    //     <ul key={order.id}>
    //       <h5>Table: {order.table_id}</h5>
    //       {order.order_items.map((item) => (
    //         <li key={item.id}>
    //           {item.name} x {item.quantity}
    //           </li>
    //       ))}
    //     </ul>
    //   ))}
    // </div>
    <div className="kitchen-list">
      {store?.orders.map((order) => (
        <div key={order.id} className="order-container">
          <h5>Table: {order.table_id}</h5>
          <ul className="order-items-list">
            {order.order_items.map((item) => {
              const isItemCompleted = completedItems.some(
                (completedItem) => completedItem.orderId === order.id && completedItem.itemId === item.id
              );

              return (
                <li key={item.id} className={`order-item ${isItemCompleted ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={isItemCompleted}
                    onChange={() => toggleItemCompleted(order.id, item.id)}
                  />
                  <label htmlFor={`item-${item.id}`}>
                    {item.name} x {item.quantity}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
