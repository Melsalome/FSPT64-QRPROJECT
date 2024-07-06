
export const dispatcherOrder = {
    get: async(restaurantId,tableId) => {
        const response = await fetch (`${process.env.BACKEND_URL2}/app/restaurants/${restaurantId}/orders`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    },

    getPendingOrderList: async (restaurantId) => {
        const response = await fetch(`${process.env.BACKEND_URL2}/app/restaurants/${restaurantId}/orders/pending`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    }, 
    
    updateOrderStatus: async (restaurantId, orderId) => {
        const response = await fetch(`${process.env.BACKEND_URL2}/app/${restaurantId}/pending/orders/${orderId}`, {
            method: 'PATCH',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    }
}
