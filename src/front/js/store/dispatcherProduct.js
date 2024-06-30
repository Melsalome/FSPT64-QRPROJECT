import React from 'react'

const productDispatcher = {
    get: async () => {
        const response = await fetch(`http://127.0.0.1:5000/app/products`, { 
             method: "GET",
             headers: {'Content-Type' : 'application/json'}
        })
        
        if(!response.ok) throw Error("There are no products")
    
        if(response.status === 401){
             throw("Invalid request")
        }
        
        const data = await response.json()
        // console.log(data)
        return data
    }, 

    getById: async(id) => { const response = await fetch(`http://127.0.0.1:5000/app/products/${id}`, { 
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

