

import { Link } from "react-router-dom";

import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    let {mode,about, title, } = this.props
    return (
        <>
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`} >
            <Link className="navbar-brand" to="/">{title}</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/about">{about} <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/">Action</a>
                            <a className="dropdown-item" href="/">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Something else here</a>
                        </div>
                    </li>

                </ul>

                <div className={`custom-control custom-switch text-${mode ==='light'?'dark':'light' }`}>
                    {/* <input type="checkbox" onClick={LightModeToggle} className="custom-control-input"  id="customSwitches" />
                    <label className="custom-control-label" htmlFor="customSwitches">Enable {mode ==='light'?'dark':'light' }</label> */}
                </div>
            </div>
        </nav>
    </>
    )
  }
}

