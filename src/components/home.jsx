import React, { useState } from 'react'
import Register from './register'
// import { useCookies } from "react-cookie";




export default function Home() {
  // const [cookies] = useCookies(["user"]);
  const [session, setSession] = useState(false)



  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      // cookie: cookies.user
    })
    
  }).then((response) => response.json())



  function Item({ name, isPacked }) {
    if(!isPacked) {
      return <Register setSession={setSession} />;
    }
    return<li className = "item">{ name }</li>;
}


// fetch('http://localhost:5000/', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },

// }).then((response) => response.json())
//   .then(json => {
//     if (json.response === true) {
//       console.log(json.response);
//       setSession(true)
//     } else {
//       console.log(json.response);
//       setSession(false)
//     }




//   })





return (
  <Item
    isPacked={session}
    name="Space suit"
  />
)
}
