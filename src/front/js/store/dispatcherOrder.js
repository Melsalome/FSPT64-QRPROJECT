
export const dispatcherOrder = {
    get: async(restaurantId,tableId) => {
        const response = await fetch (`${process.env.BACKEND_URL}/app/restaurants/${restaurantId}/orders`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    },

    getPendingOrderList: async (restaurantId) => {
        const response = await fetch(`${process.env.BACKEND_URL}/app/restaurants/${restaurantId}/orders/pending`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    }, 
    
    updateOrderStatus: async (restaurantId, orderId) => {
        const response = await fetch(`${process.env.BACKEND_URL}/app/${restaurantId}/pending/orders/${orderId}`, {
            method: 'PATCH',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    },

    getOrderById: async (restaurantId, orderId) => {
        const response = await fetch(`${process.env.BACKEND_URL}/app/restaurants/${restaurantId}/tables/${tableId}orders/${orderId}`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json();
    }
}
