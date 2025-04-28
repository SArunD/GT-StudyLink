import React, { useContext, useEffect, useState } from 'react'
import { arrayRemove, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'

import { AuthContext } from '../utils/AuthContext'
import Modal from 'react-modal'
import { db } from "../lib/firebaseConfig"

function ViewEvents() {
  const [userEvents, setEvents] = useState([])
  const { user } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getUserEvents()
  }, [])
  
  const getUserEvents = async () => {
    if (!user) {
      console.log("Must be logged in")
      return
    }

    setLoading(true)
    const qryRef = query(collection(db, "events"), where("authorEmail", "==", user.email))
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

  Modal.setAppElement('#root')
  const handleClick = async (idx) => {
    setModalData(userEvents[idx])

    if (!modalOpen) {
      setModalOpen(true)
    }
  }

  const handleDelete = async (id) => {
    const proceed = confirm("Do you want to delete this event?")
    if (proceed) {
      await deleteDoc(doc(db, "events", id))
      .catch((err) => alert(err))

      const qryRef = query(collection(db, "users"), where("rsvps", "array-contains", id))
      const qrySnap = await getDocs(qryRef)

      qrySnap.forEach((doc) => {
        updateDoc(doc.ref, {
          rsvps: arrayRemove(id)
        })
      })
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
          <h3>{modalData.title}</h3>
          <div><span style={{ fontWeight: "bold" }}>Date:</span> {modalData.date}</div>
          <div><span style={{ fontWeight: "bold" }}>Location:</span> {modalData.location}</div>
          <div><span style={{ fontWeight: "bold" }}>Start Time:</span> {new Date(`${modalData.date}T${modalData.startTime}:00`).toLocaleTimeString()}</div>
          <div><span style={{ fontWeight: "bold" }}>End Time:</span> {new Date(`${modalData.date}T${modalData.endTime}:00`).toLocaleTimeString()}</div>
          <div><span style={{ fontWeight: "bold" }}>Details:</span> {modalData.details}</div>
          <div><span style={{ fontWeight: "bold" }}>Tags:</span> {modalData.tags.join(", ")}</div>
          <div><span style={{ fontWeight: "bold" }}>Created By:</span> <span className="text-primary">{modalData.authorEmail}</span></div>
          <button className="btn btn-danger" style={{ position: "absolute", bottom: 20, right: 20 }} onClick={() => setModalOpen(false)}><i className="bi bi-x-lg"></i> Close</button>
        </>}
      </Modal>
      <h3 className="mt-3 mb-3">My Events</h3>
      {isLoading ? 
      (<div className="fs-1 text-center">⌛ Loading...</div>) :
      (userEvents.length > 0 ? (
        userEvents.map((item, idx) => (
          <div className="container card p-3 shadow" key={item.id}>
            <h5 className="mt-2">{item.title}</h5>
            <div style={{ position: "absolute", top: 16, right: 20 }}>
              <button className="btn btn-primary col-1.5 mx-3" onClick={() => handleClick(idx)}>
                <i className="bi bi-arrow-up-circle"></i> Open
              </button>
              <button className="btn btn-outline-danger col-1.5" onClick={() => handleDelete(item.id)}>
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
        ))) : (
          <h4>No events found!</h4>
        )
      )}
    </div>
  )
}

export default ViewEvents
