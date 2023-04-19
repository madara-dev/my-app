import React, { useState } from 'react'
import Register from './register'
// import { useCookies } from "react-cookie";
import Alert from "./alert";
import { Cookies } from 'react-cookie';



export default function Home() {
  const cookies = new Cookies();
  // const [cookies] = useCookies(["user"]);
  const [session, setSession] = useState(false)
  const [alert, setAlert] = useState(null)

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //     setAlert(null)
  //   }, 2000);
  // }

  fetch('http://localhost:5000/jwt_decoder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      cookie: cookies.get('token')
    })

  }).then((response) => response.json())
    .then(json => {
        console.log(json);
    })



  function Item({ name, isPacked }) {
    if (!isPacked) {
      return <Register setSession={setSession} />;
    }
    return <li className="item">{name}</li>;
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
    <>
      <center>

        <Alert alert={alert} />
      </center>

      <Item
        isPacked={session}
        name="Space suit"
      />
    </>
  )
}
