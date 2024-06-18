export const dispatcherOrder = {
    get: async (restaurantId, tableId) => {
        const response = await fetch(`https://humble-pancake-977xqppgr6q427j55-3001.app.github.dev/api/restaurants/${restaurantId}/orders`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    }
}