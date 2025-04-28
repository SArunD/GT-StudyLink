import React, { useContext, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'

import { AuthContext } from '../utils/AuthContext'
import { db } from "../lib/firebaseConfig"

function ViewEvents() {
  const [userEvents, setEvents] = useState([])
  const { user } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getUserEvents()
  }, [])
  
  const getUserEvents = async () => {
    if (!user) {
      console.log("Must be logged in")
      return
    }

    setLoading(true)
    const qryRef = query(collection(db, "events"), where("createdBy", "==", user.email))
    const qrySnap = await getDocs(qryRef)

    if (qrySnap.empty) {
      setLoading(false)
      console.log("No events created")
      return
    }

    const docs = []
    qrySnap.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...doc.data()
      })
    })
    setLoading(false)
    setEvents(docs)
  }

  const handleDelete = async (id) => {
    const proceed = confirm("Do you want to delete this event?")
    if (proceed) {
      await deleteDoc(doc(db, "events", id))
      .then(() => {
        console.log("deleted!")
        getUserEvents()
      })
      .catch((err) => alert(err))
    }
  }
    
  return (
    <div>
      <h3>View Events</h3>
      {isLoading ? (<h4>Loading</h4>) :
      (userEvents.length > 0 ? (
        userEvents.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <button onClick={() => handleDelete(item.id)}>Delete?</button>
          </div>
        ))) : (
          <h4>No events found!</h4>
        )
      )}
    </div>
  )
}

export default ViewEvents
