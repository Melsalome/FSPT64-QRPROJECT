import React from 'react'


// Desde este dispatcher se hace la llamada fetch al (lo que debería ser) la base de datos, hace un request y a través del body se pasa la info a confirmar, 
// si está confirmada regresa el token.      
// Se le pasa el email y el password como argumento para indicar que es lo que va a recibir como parametro. 

const loginDispatcher = async (email, password) => {
    const response = await fetch(`https://urban-invention-x559rxpg57j63vrg-3001.app.github.dev/api/login`, { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         CORS: 'Access-Control-Allow-Origin',
         body: JSON.stringify({  "email": email,
            "password": password  }) 
    })
    
    if(!response.ok) throw Error("There was a problem in the login request")

    if(response.status === 401){
     console.log(response)
         throw("Invalid credentials")
    }
    else if(response.status === 400){
         throw ("Invalid email or password format")
    }
    const data = await response.json()
    // Guarda el token en la sessionStorage
    // También deberías almacenar el usuario en la store utilizando la función setItem
    sessionStorage.setItem("token", data.token);
    console.log(data)
    return data
}


export default loginDispatcher

