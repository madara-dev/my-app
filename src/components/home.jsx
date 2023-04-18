import React, {useState} from 'react'
import Register from './register'






export default function Home() {
  const [session, setSession]= useState(false)

  function Item({ name, isPacked }) {
    if (!isPacked) {
      return <Register/>;
    }
    return <li className="item">{name}</li>;
  }
  
  
  const SessionCheker = ()=>{
    fetch('http://localhost:5000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
  
    }).then((response) => response.json())
    .then(json => {
        if (json.response === true) {
          setSession(true)
        } else{
          setSession(false)
        }
         
        
  
  
    })
  }
  



  return (
    <Item 
          isPacked={session} 
          name="Space suit" 
        />
  )
}
