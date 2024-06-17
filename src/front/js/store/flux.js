import loginDispatcher from "./dispatcherLogin";

import signupDispatcher from "./dispatcherSignup";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			token: null,
			register: null,
			menu: [],
            cart: [],
            totalAmount: 0,
            orders: []
		},
		actions: {
		
			
            getTokenLogin: async (email, password) => {
                const {access_token} = await loginDispatcher(email, password);
                if (access_token) {
                    localStorage.setItem("token", access_token);
                    setStore({ token: access_token })}},
			
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
				setStore({...store, token: null})
			},
			
			getUserRegister: async(restaurantName,firstName, LastName,email, password) => {
				const data = await signupDispatcher(restaurantName,firstName, LastName, email,password);
				console.log(data)
				return data;

			},

			getMenu: (restaurantId,tableId) => {
                const store = getStore()
                fetch(`https://humble-pancake-977xqppgr6q427j55-3001.app.github.dev/api/restaurants/${restaurantId}/tables/${tableId}/menu`)
                    .then(response => response.json())
                    .then(data => {
                        setStore({ ...store, menu: data });
                    })
                    .catch(error => console.error('Error fetching menu:', error));
            },
            // getMenuItem: (restaurantId, tableId, menuId) => {
            //     const store = getStore();
            //     fetch(`https://humble-pancake-977xqppgr6q427j55-3001.app.github.dev/api/restaurants/${restaurantId}/tables/${tableId}/menus/${menuId}`)
            //         .then(response => response.json())
            //         .then(data => {
            //             setStore({ ...store, menuItem: data, menu: [] }); 
            //         })
            //         .catch(error => console.error('Error fetching menu item:', error));
            // },

            getOrder: async(restaurantId, tableId, comment, paymentMethod, totalPrice) => {
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
                        price: meal.price
                    }))
                };
        
                try {
                    const response = await fetch(`https://humble-pancake-977xqppgr6q427j55-3001.app.github.dev/api/restaurants/${restaurantId}/tables/${tableId}/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
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
                    alert('Error creating order. Please try again.');
                }
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
            }
		
		}
	};
};

export default getState;
