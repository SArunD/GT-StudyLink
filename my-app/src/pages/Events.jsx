import "../styles/Events.css"

import React, { useEffect, useState } from 'react'
import { collection, getDocs, } from "firebase/firestore"

import Calendar from "../components/Calendar"
import Table from "../components/Table"
import { db } from "../lib/firebaseConfig"
import randomColor from "randomcolor"

function Events() {
  const [events, setEvents] = useState([])
  const [rawEvents, setRawEvents] = useState([])
  const [isCalendar, setIsCalendar] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
  }, [])
  
  const getEvents = async () => {
    setLoading(true)
    const snapshot = await getDocs(collection(db, "events"))
    setRawEvents(snapshot.docs)
    const docs = []
    snapshot.forEach((doc) => {
      docs.push({
        id: doc.id,
        title: doc.data().title,
        start: new Date(`${doc.data().date}T${doc.data().startTime}:00`).toISOString(),
        end: new Date(`${doc.data().date}T${doc.data().endTime}:00`).toISOString(),
        textColor: "black",
        extendedProps: {
          location: doc.data().location,
          description: doc.data().details,
          tags: doc.data().tags,
          authorEmail: doc.data().authorEmail,
          isRSVP: false
        }
      })
    })
    randomColor({ count: docs.length }).forEach((color, idx) => {
      docs[idx].color = color
    })
    console.log(docs)
    setEvents(docs)
    setLoading(false)
  }

  const handleView = (val) => {
    if (val == 0) {
      setIsCalendar(true)
    } else {
      setIsCalendar(false)
    }
  }
  
  return (
    <div>
        {loading ? (
          <div className="fs-1 text-center">⌛ Loading...</div>
        ) : (
          <>
            <div className="d-flex justify-content-center gap-3 mb-3">
              <button className="rounded btn btn-primary" onClick={() => handleView(0)}>Calendar</button>
              <button className="rounded btn btn-primary" onClick={() => handleView(1)}>Table/Tile</button>
            </div>
            {isCalendar ? (<Calendar data={events} />) : (<Table data={rawEvents} />)}
          </>
        )}
    </div>
  )
}

export default Events