import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from "../utils/AuthContext"

function Header() {
  const { user } = useContext(AuthContext)

  return (
    // <header style={{ border: "2px solid red" }}>
    //     Header
    //     {user ? <h2>Logged IN</h2> : <h2>Not Logged</h2>}
    // </header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">StudyLink</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/events">Events</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/events/add">Add Event</Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {user ? (
            <span className="navbar-text me-3">
              Welcome, {user.email}
            </span>
          ) : (
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header