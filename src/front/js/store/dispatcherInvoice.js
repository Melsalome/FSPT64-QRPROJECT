export const dispatcherInvoice = {
    get: async(restaurantId,tableId,invoiceId) => {
        const response = await fetch (`${process.env.BACKEND_URL}/app/restaurants/${restaurantId}/tables/${tableId}/invoices/${invoiceId}`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'},
            CORS:'Access-Control-Allow-Origin'
        })
        
        return await response.json()
    }
}