import { IoRestaurantSharp } from "react-icons/io5";

import deleteProductDispatcher from "./dispatcherDeleteProduct";

import loginDispatcher from "./dispatcherLogin";

import newProductDispatcher from "./dispatcherNewProduct";
import productDispatcher from "./dispatcherProduct";
// import dispatcherProduct from "./dispatcherProduct";
import { dispatcherOrder } from "./dispatcherOrder";


import signupDispatcher from "./dispatcherSignup";


const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            product: [],
            token: null,
            register: null,
            menu: [],
            cart: [],
            restaurant: [],
            totalAmount: 0,
            orders: []
        },
        actions: {


            getTokenLogin: async (email, password) => {
                const { access_token } = await loginDispatcher(email, password);
                if (access_token) {
                    localStorage.setItem("token", access_token);
                    setStore({ token: access_token })
                }
            },

            syncTokenLocalStorage: () => {
                const token = localStorage.getItem("token");
                if (token) {
                    setStore({ token: token });
                }
            },

            handleLogOut: () => {
                localStorage.removeItem("token")
                console.log("Loging out")
                const store = setStore()
                setStore({ ...store, token: null })
            },

            getUserRegister: async (restaurantName, firstName, LastName, email, password) => {
                const data = await signupDispatcher(restaurantName, firstName, LastName, email, password);
                console.log(data)
                return data;

            },

            getMenu: (restaurantId, tableId) => {
                const store = getStore()
                fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/tables/${tableId}/menu`)
                    .then(response => response.json())
                    .then(data => {
                        setStore({ ...store, menu: data });
                    })
                    .catch(error => console.error('Error fetching menu:', error));
            },

            createOrder: async (restaurantId, tableId, comment, paymentMethod, totalPrice) => {
                const store = getStore()
                const orderData = {
                    restaurant_id: restaurantId,
                    table_id: tableId,
                    comment: comment,
                    payment_method: paymentMethod,
                    total_price: totalPrice,
                    items: store.cart.map(meal => ({
                        menu_id: meal.id,
                        name: meal.name,
                        quantity: meal.quantity,
                        price: meal.price,
                    }))
                };

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/tables/${tableId}/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        CORS: 'Access-Control-Allow-Origin',
                        body: JSON.stringify(orderData)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create order');
                    }

                    const result = await response.json();
                    setStore({ ...store, orders: [...store.orders, result] });
                    console.log('Order created successfully:', result);
                } catch (error) {
                    console.error('Error:', error);
                    // alert('Error creating order. Please try again.');
                }
            },

            getOrder: async (restaurantId) => {
                const data = await dispatcherOrder.get(restaurantId);
                const store = getStore();
                const ordersWithTimestamp = store.orders.map(order => ({
                    ...order,
                    timestamp: new Date().toISOString()
                }));

                setStore({ orders: ordersWithTimestamp });
                setStore({ ...store, orders: data });
                console.log(data);
            },


            updateOrder: async (restaurantId, tableId, orderId, updatedOrderData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/tables/${tableId}/orders/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        CORS: 'Access-Control-Allow-Origin',
                        body: JSON.stringify(updatedOrderData)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update order');
                    }

                    const result = await response.json();
                    const store = getStore();
                    const updatedOrders = store.orders.map(order => order.id === orderId ? result : order);
                    setStore({ ...store, orders: updatedOrders });
                    console.log('Order updated successfully:', result);
                } catch (error) {
                    console.error('Error:', error);
                    // alert('Error updating order. Please try again.');
                }
            },

            deleteOrder: async (restaurantId, tableId, orderId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/tables/${tableId}/orders/${orderId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        CORS: 'Access-Control-Allow-Origin',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete order');
                    }

                    const store = getStore();
                    const updatedOrders = store.orders.filter(order => order.id !== orderId);
                    setStore({ ...store, orders: updatedOrders });
                    console.log('Order deleted successfully');
                } catch (error) {
                    console.error('Error:', error);
                    // alert('Error deleting order. Please try again.');
                }
            },

            removeOrderFromList: (orderId) => {
                const store = getStore();
                const updatedOrders = store.orders.filter(order => order.id !== orderId);
                setStore({ ...store, orders: updatedOrders });
            },

            addToCart: (meal, quantity = 1) => {
                const store = getStore()
                const existingItemIndex = store.cart.findIndex(item => item.id === meal.id);

                if (existingItemIndex !== -1) {
                    const updatedCart = [...store.cart];
                    updatedCart[existingItemIndex].quantity += quantity;
                    setStore({ ...store, cart: updatedCart });
                    console.log(store.cart)
                } else {
                    const updatedCart = [...store.cart, { ...meal, quantity }];
                    setStore({ ...store, cart: updatedCart });
                    console.log(store.cart)
                }

                const updatedTotalAmount = store.totalAmount + (meal.price) * quantity;
                setStore({ ...store, totalAmount: updatedTotalAmount });
            },

            removeFromCart: (mealId) => {
                const store = getStore();
                const updatedCart = store.cart.map(meal => {
                    if (meal.id === mealId) {
                        if (meal.quantity > 1) {
                            return { ...meal, quantity: meal.quantity - 1 };
                        } else {
                            return null;
                        }
                    } else {
                        return meal;
                    }
                }).filter(meal => meal !== null);

                const mealToRemove = store.cart.find(meal => meal.id === mealId);
                const updatedTotalAmount = store.totalAmount - mealToRemove.price;

                setStore({ ...store, cart: updatedCart, totalAmount: updatedTotalAmount });
            },

            removeItem: (mealId) => {
                const store = getStore();
                const updatedCart = store.cart.filter(meal => meal.id !== mealId);

                setStore({ ...store, cart: updatedCart });

            },

            clearCart: () => {
                const store = getStore();
                setStore({ ...store, cart: [], totalAmount: 0 });
            },


            getRestaurant: (restaurantId) => {
                const store = getStore()
                fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}`)
                    .then(response => response.json())
                    .then(data => {
                        setStore({ ...store, restaurant: data });
                    })
                    .catch(error => console.error('Error fetching menu:', error));
            },

            getProduct: async () => {
                const data = await productDispatcher.get();
                //   console.log(data)
                // const store = getStore();
                // setStore({...store, data})
                return data
            },

            getProductById: async (id) => {
                const data = await productDispatcher.getById(id)
                // console.log(data)
                return data;
            },

            uptadeProductById: async (id, name, price, description, image, category) => {
                const data = await productDispatcher.put(id, name, price, description, image, category)
                return data;
            },

            createNewProduct: async (name, price, description, image, category) => {
                const data = await newProductDispatcher(name, price, description, image, category)
                return data;
            },

            deleteProduct: async (id) => {
                const data = await deleteProductDispatcher(id);
                return data;

            }

        }
    };
};

export default getState;