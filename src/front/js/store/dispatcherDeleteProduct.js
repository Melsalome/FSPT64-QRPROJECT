import react from 'react'


const deleteProductDispatcher = async (id) => {
    
    const response = await fetch(`${process.env.BACKEND_URL}/app/products/${id}`, { 
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
         CORS:'Access-Control-Allow-Origin',
          
    })
    console.log(response)
    if(!response.ok) throw Error("No se ha podido eliminar el producto")
   
    const data = await response.json()
    console.log("Producto eliminado con éxito", data)
    
    return data
}

export default deleteProductDispatcher

