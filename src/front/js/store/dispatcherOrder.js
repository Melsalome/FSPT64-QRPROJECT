export const dispatcherOrder = {
    get: async(restaurantId,tableId) => {
        const response = await fetch (`re${process.env.BACKEND_URL}/app/restaurants/${restaurantId}/orders`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        })
        return await response.json()
    }
}