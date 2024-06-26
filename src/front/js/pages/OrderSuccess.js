import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const OrderSuccess = () => {
    const { restaurantId, tableId} = useParams();
    return (
        <>
            {/* <Navbar /> */}
            <div className="order-success">
                {/* <h2>Thanks for your order</h2> */}
                <div className="success-message">
                    Your order has been placed successfully!
                </div>
                <br />
                <Link to={`/restaurants/${restaurantId}/tables/${tableId}/menu`}>
                    <button className="button1">Back to Menu</button>
                </Link>
            </div>
            {/* <Footer /> */}
        </>
    );
};