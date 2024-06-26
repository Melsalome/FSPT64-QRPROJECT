import React from 'react'


// Desde este dispatcher se hace la llamada fetch al (lo que debería ser) la base de datos, hace un request y a través del body se pasa la info a confirmar, 
// si está confirmada regresa el token.      
// Se le pasa el email y el password como argumento para indicar que es lo que va a recibir como parametro. 
const productDispatcher = {
    get: async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/app/products`, { 
             method: "GET",
             headers: {'Content-Type' : 'application/json'}
        })
        
        if(!response.ok) throw Error("There are no products")
    
        if(response.status === 401){
             throw("Invalid credentials")
        }
        else if(response.status === 400){
             throw ("Invalid email or password format")
        }
        const data = await response.json()
        // console.log(data)
        return data
    }, 

    getById: async(id) => { const response = await fetch(`${process.env.BACKEND_URL}/app/products/${id}`, { 
        method: "GET",
        headers: {'Content-Type' : 'application/json'}
   })
   
   if(!response.ok) throw Error("There are no products")

   if(response.status === 401){
        throw("Invalid credentials")
   }
   else if(response.status === 400){
        throw ("Invalid email or password format")
   }
   const data = await response.json()
   // console.log(data)
   return data
},
put: async(id, name, price, description, image, category)=> { 
    const response = await fetch(`http://127.0.0.1:5000/app/products/${id}`, { 
    method: "PUT",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({  "name": name, "price":price, "description": description, "image": image, "category": category  })
})

if(!response.ok) throw Error("There are no products")

if(response.status === 401){
    throw("Invalid credentials")
}
else if(response.status === 400){
    throw ("Invalid email or password format")
}
const data = await response.json()
// console.log(data)
return data
},
}




export default productDispatcher

