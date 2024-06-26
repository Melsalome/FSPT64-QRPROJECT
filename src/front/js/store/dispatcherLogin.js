import React from 'react'


const loginDispatcher = async (email, password) => {
     const response = await fetch(`${process.env.BACKEND_URL}/app/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          CORS: 'Access-Control-Allow-Origin',
          body: JSON.stringify({
               "email": email,
               "password": password
          })
     })

     if (!response.ok) throw Error("There was a problem in the login request")

     if (response.status === 401) {
          console.log(response)
          throw ("Invalid credentials")
     }
     else if (response.status === 400) {
          throw ("Invalid email or password format")
     }
     const data = await response.json()
     // Guarda el token en el LocalStorage
     // También deberías almacenar el usuario en la store utilizando la función setItem
     localStorage.setItem("token", data.token);
     console.log(data)
     return data
}


export default loginDispatcher

