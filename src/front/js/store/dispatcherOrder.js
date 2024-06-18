export const dispatcherOrder = {
    get: async (restaurantId, tableId) => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/orders`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    }
}
