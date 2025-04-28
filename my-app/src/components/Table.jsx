import React, { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../utils/AuthContext'
import { db } from "../lib/firebaseConfig"

function Table(props) {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setEvents(props.data)
    setLoading(false)
  }, [])

  const add = async (docRef) => {
    await updateDoc(docRef, {
      rsvps: arrayUnion(user.uid)
    })
    
    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      rsvps: arrayUnion(docRef.id)
    })
    .then(() => {
      setEvents(events)
      alert("RSVP Added!")
    })
  }

  const remove = async (docRef) => {
    await updateDoc(docRef, {
      rsvps: arrayRemove(user.uid)
    })
    
    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      rsvps: arrayRemove(docRef.id)
    })
    .then(() => {
      setEvents(events)
      alert("RSVP Removed!")
    })
  }

  const addRSVP = async (id, idx) => {
    const docRef = doc(db, "events", id)
    const docSnap = await getDoc(docRef)

    if ("rsvps" in docSnap.data()) {
      if (docSnap.data().rsvps.includes(user.uid)) {
        alert("Already RSVPd!")
      } else if (docSnap.data().rsvps.length == docSnap.data().rsvp) {
        alert("RSVP Limit Reached!")
      } else {
        add(docRef)
      }
    } else {
      add(docRef)
    }
  }

  const removeRSVP = async (id, idx) => {
    const docRef = doc(db, "events", id)
    const docSnap = await getDoc(docRef)

    if (!("rsvps" in docSnap.data())) {
      alert("No RSVPs Found!")
    } else {
      if (!docSnap.data().rsvps.includes(user.uid)) {
        alert("Not RSVPd Yet!")
      } else {
        remove(docRef)
      }
    }
  }

  return (
    <div>
      <h3>Table</h3>
      {loading ? (
        <h3>Loading</h3>
      ) : 
        (events.map((item, key) => (
          <div key={key}>
            {item.data().title} ({item.data().tags})
            {user && (
              <>
                <button onClick={() => addRSVP(item.id, key)}>
                  RSVP?
                </button>
                <button onClick={() => removeRSVP(item.id, key)}>
                  Remove RSVP?
                </button>
              </>
            )}
          </div>
        )))
      }
    </div>
  )
}

export default Table