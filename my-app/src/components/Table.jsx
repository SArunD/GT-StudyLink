import React, { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../utils/AuthContext'
import Modal from 'react-modal'
import { db } from "../lib/firebaseConfig"

function Table(props) {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  
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

  const addRSVP = async (id) => {
    console.log(id)
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

  const removeRSVP = async (id) => {
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

  Modal.setAppElement('#root')
  const handleClick = async (id) => {
    setModalData(events[id])

    if (!modalOpen) {
      setModalOpen(true)
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
        style={{ overlay: { zIndex: 1000 }, content: { height: "35vh", width: "50vw", left: "27%" } }}
      >
        {modalOpen && 
        <>
          <h3>{modalData.data().title}</h3>
          <div><span style={{ fontWeight: "bold" }}>Date:</span> {modalData.data().date}</div>
          <div><span style={{ fontWeight: "bold" }}>Location:</span> {modalData.data().location}</div>
          <div><span style={{ fontWeight: "bold" }}>Start Time:</span> {new Date(`${modalData.data().date}T${modalData.data().startTime}:00`).toLocaleTimeString()}</div>
          <div><span style={{ fontWeight: "bold" }}>End Time:</span> {new Date(`${modalData.data().date}T${modalData.data().endTime}:00`).toLocaleTimeString()}</div>
          <div><span style={{ fontWeight: "bold" }}>Details:</span> {modalData.data().details}</div>
          <div><span style={{ fontWeight: "bold" }}>Tags:</span> {modalData.data().tags.join(", ")}</div>
          <div><span style={{ fontWeight: "bold" }}>Created By:</span> <span className="text-primary">{modalData.data().authorEmail}</span></div>
          <button className="btn btn-danger" style={{ position: "absolute", bottom: 20, right: 20 }} onClick={() => setModalOpen(false)}><i className="bi bi-x-lg"></i> Close</button>
        </>}
      </Modal>
      {loading ? (
        <div className="fs-1 text-center">⌛ Loading...</div>
      ) : 
        <>
          {/* <input type="text" /> */}
          <h3 className="text-center mt-3 mb-3">Upcoming Events</h3>
          {events.map((item, key) => (
            <div className="container card p-4 shadow" key={key}>
              <span style={{ fontWeight: "bold" }}>{item.data().title} - {new Date(`${item.data().date}T${item.data().startTime}:00`).toLocaleTimeString()}</span>
              {user ? (
                <>                  
                  <div style={{ position: "absolute", top: 16, right: 20 }}>
                    <button className="btn btn-primary col-1.5 col" onClick={() => handleClick(key)}>
                      <i className="bi bi-arrow-up-circle"></i> Open
                    </button>
                    {/* {console.log(item.data().authorEmail)} */}

                    {item.data().authorEmail != user.email && (
                      <>
                        <button className="btn btn-outline-success col-1.5 col mx-3" onClick={() => addRSVP(item.id)}>
                          RSVP?
                        </button>
                        <button className="btn btn-outline-danger col-1.5 col" onClick={() => removeRSVP(item.id)}>
                          Remove RSVP?
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <button className="btn btn-primary col-1.5" style={{ position: "absolute", top: 16, right: 20 }} onClick={() => handleClick(key)}>
                  <i className="bi bi-arrow-up-circle"></i> Open
                </button>
              )}
            </div>
          ))}
        </>
      }
    </div>
  )
}

export default Table