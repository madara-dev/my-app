
// import axios from "axios";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";


import React, { useState } from 'react'
import Alert from "./alert";

function Register(props) {


  const [setCookie] = useCookies(["user"]);
  const [creds, setCreds] = useState({ username: "", eaddress: "", password: "", cpassword: "" });
  const [alert, setAlert] = useState(null)





  
  

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  const RegisterSubmited = async function (e) {

    const { username, eaddress, password, cpassword } = creds
    

    e.preventDefault()


    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: username,
        eaddress: eaddress,
        password: password,
        cpassword: cpassword
      })
    })
      .then((response) => response.json())
      .then(json => {
        if (json.errors) {
          showAlert(json.errors.msg, "denger")
        } else {
          showAlert("successfully registered", "success")
          setCookie("jwt", json.authtoken, { path: "/", httpOnly:true,});
          

          setTimeout(() => {
            props.setSession(true)
            

          }, 2000);
        }



      })




  }

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })

  }



  return (
    <>
      <center>

        <Alert alert={alert} />
      </center>
      <main className={`login-form`} id='regmain'>
        <div className="cotainer">


          <div className={`text-dark row justify-content-center`} >
            <div className="col-md-8">
              <div className={`card Bg-color-dark`}>


                <form onSubmit={RegisterSubmited}>
                  <div className="card-body" id='card' >



                    <div className="form-group row">

                      <label htmlFor="username" className={`col-md-4 col-form-label text-md-right text-light`}>name
                      </label>
                      <div className="col-md-6">


                        <input style={{ border: "1px solid black" }} type="text" id="username" onChange={onChange}


                          className="form-control" name="username" value={props.value} autoFocus placeholder="username" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="Email_Address" className={`col-md-4 col-form-label text-md-right text-light`}>Email Address</label>
                      <div className="col-md-6">


                        <input style={{ border: "1px solid black" }} type="text" id="Email_Address" onChange={onChange}
                          className="form-control" placeholder="email address" name="eaddress" value={props.value} autoFocus />


                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="password" className={`col-md-4 col-form-label text-md-right text-light`}>Password</label>
                      <div className="col-md-6">


                        <input style={{ border: "1px solid black" }} type="password" id="password" onChange={onChange}
                          className="form-control" name="password" value={props.value} placeholder="password(min 8, max 30)" autoFocus />


                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="confirm password" className={`col-md-4 col-form-label text-md-right text-light`}>confirm Password</label>
                      <div className="col-md-6">


                        <input style={{ border: "1px solid black" }} value={props.value} type="password" id="confirm_password" onChange={onChange}
                          className="form-control" name="cpassword" autoFocus placeholder="confirm password" />


                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-6 offset-md-4">
                        <div className="checkbox">
                          <label>
                            <Link to="/login" className={`btn btn-link text-light`}>
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





export default Register










