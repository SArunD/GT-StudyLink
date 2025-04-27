import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

import { AuthContext } from "../utils/AuthContext"
import { db } from "../lib/firebaseConfig"
import { terminal } from 'virtual:terminal'
import { useNavigate } from 'react-router'

function Home() {
  const [items, setItems] = useState([])
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    const proceed = confirm("You are about to Logout, do you want to proceed?")
    if (proceed) {
      setUser(null)
      localStorage.removeItem("user")
      console.log("Logged Out User")
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {/* <h2>Home</h2> */}

      <p className="fs-1 text-center">Hello, {user.email}!</p>
      <button className="btn btn-primary w-100 mb-2" onClick={() => navigate("/events/view")}>View My Events</button>
      <button className="btn btn-danger w-100 mb-2" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home