import React, { useContext } from 'react'

import { AuthContext } from "../utils/AuthContext"
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  
  return (
    <div className="container mt-5 text-center">
      <div className="fs-1 mb-2">Page Not Found!</div>
      <p className="mb-3">We can't find the page you were looking for.</p>
      {user ? (
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate("/home")}>Back To Home</button>
          <button className="btn btn-outline-primary" onClick={() => navigate("/events")}>Back To Events</button>
        </div>
      ) : (
        <button className="btn btn-outline-primary" onClick={() => navigate("/home")}>Back To Home</button>
      )}
    </div>
  )
}

export default NotFound
