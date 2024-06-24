
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/summary.css";

export const OrderSummary = () => {
  const { store, actions } = useContext(Context);
  const [comment, setComment] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { restaurantId, tableId } = useParams();

  const totalPrice = store.cart.reduce(
    (total, meal) => total + meal.price * meal.quantity,
    0
  );
  const navigate = useNavigate();
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };


    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };
    const handleFinishOrder = async() => {
        if (!paymentMethod) {
            alert('Please choose your payment method!');
            return;
        }

        try {
            const orderResult = await actions.createOrder(restaurantId, tableId, comment, paymentMethod, totalPrice);
        // console.log('Order result:', orderResult);
        if (orderResult && orderResult.id) {
            const orderId = orderResult.id;
            console.log('Order ID:', orderId);
            const invoiceResult = await actions.createInvoice(restaurantId, tableId, orderId);
            actions.clearCart();
            navigate(`/app/restaurants/${restaurantId}/tables/${tableId}/order-success`);
        } else {
            throw new Error('Order result is undefined or missing the order ID');
        }
        } catch (error) {
            console.error('Error finishing order:', error);
            alert('Error finishing order. Please try again.');
        }
     
              
                
            }
     
    
    return (
        <>
            <Navbar />
            <div className="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    {store.cart.map((meal, index) => (
                        <li key={index}>
                            <div>{meal.name}</div>
                            <div>x {meal.quantity}</div>
                            <div className="butt">
                            {meal.quantity === 1 ? (
                <>
                    <button className='trash-icon' onClick={() => actions.removeItem(meal.id)}>
                    <i className="fa-solid fa-trash fa-xs"></i>

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };
//   const handleFinishOrder = () => {
//     if (!paymentMethod) {
//       alert("Please choose your payment method!");
//       return;
//     }
//     actions.addProductToTable(tableId, store.cart);
//     actions.createOrder(
//       restaurantId,
//       tableId,
//       comment,
//       paymentMethod,
//       totalPrice
//     );
//     actions.clearCart();
//     navigate(`/restaurants/${restaurantId}/tables/${tableId}/order-success`);
//   };
//   console.log("store.cart: ", store.cart);

//   return (
//     <>
//       <Navbar />
//       <div className="order-summary">
//         <h2>Order Summary</h2>
//         <ul>
//           {store.cart.map((meal, index) => (
//             <li key={index}>
//               <div>{meal.name}</div>
//               <div>x {meal.quantity}</div>
//               <div className="butt">
//                 {meal.quantity === 1 ? (
//                   <>
//                     <button
//                       className="trash-icon"
//                       onClick={() => actions.removeItem(meal.id)}
//                     >
//                       <i className="fa-solid fa-trash fa-xs"></i>

                    </button>
                    <button
                      className="butt1"
                      onClick={() => actions.addToCart(meal)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="butt1"
                      onClick={() => actions.removeFromCart(meal.id)}
                    >
                      −
                    </button>
                    <button
                      className="butt1"
                      onClick={() => actions.addToCart(meal)}
                    >
                      +
                    </button>
                  </>
                )}
              </div>

              <div>${(meal.price * meal.quantity).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className="total">
          <h5>Total Price: </h5>
          <h5>${totalPrice.toFixed(2)}</h5>
        </div>
        <div className="comments">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>

                <div className="payment-method">
                    <label htmlFor="payment">Payment Method:</label>
                    <div className="payment-icons">
                        <button className={paymentMethod === 'credit' ? 'selected' : ''} onClick={() => handlePaymentMethodChange('credit')}>
                        <i class="fa-solid fa-credit-card"></i> Credit Card
                        </button>
                        <button className={paymentMethod === 'debit' ? 'selected' : ''} onClick={() => handlePaymentMethodChange('debit')}>
                        <i class="fa-solid fa-building-columns"></i> Debit Card
                        </button>
                        <button className={paymentMethod === 'paypal' ? 'selected' : ''} onClick={() => handlePaymentMethodChange('paypal')}>
                        <i class="fa-brands fa-paypal"></i> PayPal
                        </button>
                        <button className={paymentMethod === 'cash' ? 'selected' : ''} onClick={() => handlePaymentMethodChange('cash')}>
                        <i class="fa-solid fa-money-bill"></i> Pay at Cashier
                        </button>
                    </div>
                </div>
                <div className='order-finish'>
                <Link to={`/restaurants/${restaurantId}/tables/${tableId}/menu`}>
                    <button className="button1">Back to Menu</button>
                </Link>
                    <button className='button1' onClick={handleFinishOrder}>Finish</button>
                </div>
            </div>
            <Footer />
        </>
    );

};

OrderSummary.propTypes = {
  match: PropTypes.object,
};
