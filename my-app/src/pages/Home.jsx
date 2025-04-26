import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

import { AuthContext } from "../utils/AuthContext"
import { db } from "../lib/firebaseConfig"
import { terminal } from 'virtual:terminal'

function Home() {
  const [items, setItems] = useState([])
  const { user, setUser } = useContext(AuthContext)

  console.log(user)

  const handleLogout = () => {
    const proceed = confirm("You are about to Logout, do you want to proceed?")
    if (proceed) {
      setUser(null)
      localStorage.removeItem("user")
      console.log("Logged Out User")
    }
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Home</h2>

      <p>Hello, {user.email}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home