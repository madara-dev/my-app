import Navbar from './components/Navbar';
import About from './components/about';
import Home from './components/home'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import React from 'react'

export default function App() {


 



  return(
    <>
    <Router>

      <div className="App">
        <Navbar title='Home' about='about' />
      </div>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />

      </Routes>

    </Router>
    </>

  )
}





















