import Navbar from './components/Navbar';
import Login from './components/login'
import Register from './components/register'
import About from './components/about';
import Home from './components/home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import React from 'react'

export default function App() {
  return (
    <>
      <Router>

        <div className="App">
          <Navbar title='Home' about='about' />
        </div>

        <Routes>

          <Route path='/home' element={<Home/>}  />
          <Route path='/' element={<Register/>} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login  />} />

        </Routes>

      </Router>
    </>

  )
}










  










