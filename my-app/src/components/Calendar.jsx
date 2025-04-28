import React, { useContext, useState } from 'react'
import { collection, doc } from "firebase/firestore"

import { AuthContext } from '../utils/AuthContext'
import FullCalendar from '@fullcalendar/react'
import Modal from 'react-modal'
import dayGridPlugin from '@fullcalendar/daygrid'
import { db } from "../lib/firebaseConfig"
import { getDoc } from 'firebase/firestore'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

function Calendar(props) {
  const { user } = useContext(AuthContext)
  const [modalData, setModalData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  Modal.setAppElement('#root')
  const handleClick = (info) => {
    if (!modalOpen) {
      setModalOpen(true)
    }
    setModalData(info.event)
  }

  const handleRSVP = async () => {
    if (!modalData.extendedProps.isRSVP) {
      
    }

    // const docRef = doc(db, "events", modalData.id)
    // const snapshot = await getDoc(docRef)
    // if ("rsvps" in snapshot.data()) {
      
    // } else {
    //   await updateDoc(docRef, {
    //     rsvps: [user.email]
    //   })
    //   alert("RSVP Successfully!")
    // }
  }

  return (
    <div className="px-4">
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
        style={{ overlay: { zIndex: 1000 }, content: { height: "35vh", width: "50vw", left: "27%" } }}
      >
        {modalOpen && 
        <>
          {console.log(modalData)}
          <h3>{modalData.title}</h3>
          <div><span style={{ fontWeight: "bold" }}>Date:</span> {new Date(modalData.start.toString()).toLocaleDateString()}</div>
          <div><span style={{ fontWeight: "bold" }}>Location:</span> {modalData.extendedProps.location}</div>
          <div><span style={{ fontWeight: "bold" }}>Start Time:</span> {new Date(modalData.start.toString()).toLocaleTimeString()}</div>
          <div><span style={{ fontWeight: "bold" }}>End Time:</span> {new Date(modalData.end.toString()).toLocaleTimeString()}</div>
          <div><span style={{ fontWeight: "bold" }}>Details:</span> {modalData.extendedProps.description}</div>
          <div><span style={{ fontWeight: "bold" }}>Tags:</span> {modalData.extendedProps.tags}</div>
          <div><span style={{ fontWeight: "bold" }}>Created By:</span> <span className="text-primary">{modalData.extendedProps.authorEmail}</span></div>
          <button className="btn btn-outline-primary" style={{ position: "absolute", top: 18, right: 20 }} onClick={() => handleRSVP()}>RSVP?</button>
          <button className="btn btn-danger" style={{ position: "absolute", bottom: 20, right: 20 }} onClick={() => setModalOpen(false)}>Close</button>
        </>}
      </Modal>
      <FullCalendar 
        height="85vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day"
        }}
        fixedWeekCount={false}
        events={props.data}
        dayMaxEvents={true}
        eventClick={handleClick}
      />

    </div>
  )
}

export default Calendar
