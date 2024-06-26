import React, { useContext, useState, useEffect } from 'react';
import "../../styles/AddForm.css";
import { Context } from '../store/appContext';


export const AddForm = (props) => {

    const { store, actions } = useContext(Context);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const cartItem = store.cart.find(item => item.id === props.id);
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [store.cart, props.id]);

    const addHandler = () => {
        const meal = {
            id: props.id,
            name: props.name,
            price: props.price,
            quantity: 1
        };
        actions.addToCart(meal, 1);
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeHandler = () => {
        if (quantity > 1) {
            actions.removeFromCart(props.id);
            setQuantity(prevQuantity => prevQuantity - 1);
        } else {
            actions.removeItem(props.id); 
        }
    };

    return (
        <div className='form'>
            <button type="button" className='remove-button' onClick={removeHandler}>
                <i className="fa-solid fa-minus"></i>
            </button>
            <span className='quantity'>{quantity}</span>
            <button type="button" className='add-button' onClick={addHandler}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
};
