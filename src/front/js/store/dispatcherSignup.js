import React from 'react'

// Desde este dispatcher se hace la llamada fetch al (lo que debería ser) la base de datos, hace un request y a través del body se pasa la info a confirmar,   


const signupDispatcher = async (firstName, lastName, name_of_the_restaurant, email, password) => {
    const requestBody = {
        "First Name": firstName,
        "Last Name": lastName,
        "Name of the restaurant": name_of_the_restaurant,
        "Email": email,
        "Password": password,
    }
    const response = await fetch(`https://urban-invention-x559rxpg57j63vrg-3001.app.github.dev/api/signup`, { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         CORS:'Access-Control-Allow-Origin',
         body: JSON.stringify(requestBody) 
    })
    console.log(response)
    if(!response.ok) throw Error("Hay un error en los datos")
   
    const data = await response.json()
    console.log("Usuario registrado con éxito:", data)
    // Guarda el token en la sessionStorage
  
   
    return data
}

export default signupDispatcher

