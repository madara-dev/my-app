import Navbar from './components/Navbar';
import Login from './components/login'
import Register from './components/register'
import About from './components/about';
import { Component } from 'react'
import Home from './components/home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";




export default class App extends Component {
  constructor() {
    super()
    this.state = {
      theme: "dark",
      text: ''
    }
  }



  LightModeToggle = () => {

    if (this.state.theme === 'dark') {
      this.setState({ theme: 'light' })
      document.body.style.backgroundColor = 'white'
    } else {
      this.setState({ theme: 'dark' })
      document.body.style.backgroundColor = '#201d1d'


    }
  }

  render() {
    return (
      <>

        <Router>
          <div className="App">
            <Navbar title='Home' about='about' mode={this.state.theme} LightModeToggle={this.LightModeToggle} />
          </div>
          <Routes>
            <Route path='/home' element={<Home />}/>
            <Route path='/' element={<Register mode={this.state.theme} value={this.text} prevent={this.prevent} />} />
            <Route path='/about' element={<About mode={this.state.theme} />} />
            <Route path='/login' element={<Login mode={this.state.theme}  />} />
          </Routes>
        </Router>
      </>

    )
  }
}










