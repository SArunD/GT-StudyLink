import React from 'react'
import { useNavigate } from 'react-router'


function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="container mt-5">
      <div className="fs-1 text-center">Page Not Found</div>
      <button className="btn btn-link w-100" onClick={() => navigate("/home")}>Return Home</button>
    </div>
  )
}

export default NotFound