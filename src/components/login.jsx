
// import axios from "axios";
import { Link } from "react-router-dom";

import React, { useState } from 'react'
import Alert from "./alert";

function Login(props) {

  const [creds, setCreds] = useState({ username: "", eaddress: "", password: "", cpassword: "" });
  const [alert , setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  const RegisterSubmited = async function (e) {
    const { username, password } = creds
    e.preventDefault()


    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: username,
        password: password,

      })
    })
      .then((response) => response.json())
      .then(json =>{
        if(json.errors){
          showAlert(json.errors.msg, "denger")
        }else{
          showAlert("successfully logged in", "success")
        }
        
      }) 
      



  }

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })

  }



  return (
    <>
    <center>

    <Alert alert = {alert}/>
    </center>
      <main className={`login-form`} id='regmain'>
        <div className="cotainer">


          <div className={`text-dark row justify-content-center`} >
            <div className="col-md-8">
              <div className={`card Bg-color-${props.mode}`}>


                <form onSubmit={RegisterSubmited}>
                  <div className="card-body" id='card' >



                    <div className="form-group row">

                      <label htmlFor="username" className={`col-md-4 col-form-label text-md-right text-${props.mode === 'light' ? 'dark' : 'light'}`}>username
                      </label>
                      <div className="col-md-6">


                        <input style={{ border: "1px solid black" }} type="text" id="username" onChange={onChange}


                          className="form-control" name="username" value={props.value} autoFocus placeholder="username" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="password" className={`col-md-4 col-form-label text-md-right text-${props.mode === 'light' ? 'dark' : 'light'}`}>Password</label>
                      <div className="col-md-6">


                        <input style={{ border: "1px solid black" }} type="password" id="password" onChange={onChange} 
                          className="form-control" name="password" value={props.value} placeholder="password(min 8, max 30)" autoFocus />


                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-6 offset-md-4">
                        <div className="checkbox">
                          <label>
                            <Link to="/" className={`btn btn-link text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                              already have an account
                            </Link>

                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary" id="btn" name="btn">
                        register
                      </button>
                      <a href="/" className="btn btn-link">

                      </a>
                    </div>


                  </div >
                </form>

              </div >
            </div >
          </div >
        </div >

      </main >
    </>

  )
}





export default Login










