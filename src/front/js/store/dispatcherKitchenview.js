import React from 'react'

// Desde este dispatcher se hace la llamada fetch al (lo que debería ser) la base de datos, hace un request y a través del body se pasa la info a confirmar,   

// import CryptoJS from 'crypto-js';

// const signupDispatcher = async (restaurantName, firstName, lastName, email, password) => {
//   // Encriptar datos
//   const data = JSON.stringify({
//     "restaurant name": restaurantName,
//     "first name": firstName,
//     "last name": lastName,
//     "email": email,
//     "password": password,
//   });
//   const encryptedData = CryptoJS.AES.encrypt(data, 'odin2413!odin241').toString();

//   const response = await fetch(`http://127.0.0.1:5000/app/register`, { 
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ data: encryptedData }) 
//   });

//   if (!response.ok) throw new Error("Hay un error en los datos");

//   const responseData = await response.json();
//   console.log("Usuario registrado con éxito:", data);
//   return responseData;
// };

// export default signupDispatcher;

const KitchenviewDispatcher = async (restaurantName,firstName, lastName, email, password) => {
    const requestBody = {
        "restaurant name": restaurantName,
        "first name": firstName,
        "last name": lastName,
        "email": email,
        "password": password,
    }
    const response = await fetch(`http://127.0.0.1:5000/app/register`, { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         CORS:'Access-Control-Allow-Origin',
         body: JSON.stringify(requestBody) 
    })
    console.log(response)
    if(!response.ok) throw Error("Hay un error en los datos")
   
    const data = await response.json()
    console.log("Usuario registrado con éxito:", data)
    // Guarda el token en el LocalStorage
  
   
    return data
}

export default KitchenviewDispatcher

