import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore"

import { AuthContext } from "../utils/AuthContext"
import { db } from "../lib/firebaseConfig"

function Home() {
  const { user } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    setLoading(true)
    const qryRef = query(collection(db, "users"), where("email", "==", user.email))
    const qrySnap = await getDocs(qryRef)
    
    setName(qrySnap.docs[0].data().firstName)
    setLoading(false)
  }

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="fs-1 text-center">Loading...</div>
      ) : (
        <div className="fs-1 text-center">👋 Hello, <span className="text-primary">{name}!</span></div>
      )}
    </div>
  )
}

export default Home