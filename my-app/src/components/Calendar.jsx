import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"

import FullCalendar from '@fullcalendar/react'
import Modal from 'react-modal'
import dayGridPlugin from '@fullcalendar/daygrid'
import { db } from "../lib/firebaseConfig"
import interactionPlugin from '@fullcalendar/interaction'
import randomColor from "randomcolor"
import timeGridPlugin from '@fullcalendar/timegrid'

function Calendar() {
  // const [events, setEvents] = useState([{
  //   id: 1,
  //   title: "Mock",
  //   start: "2025-04-27T12:00:00.000Z",
  //   end: "2025-04-27T15:00:00.000Z",
  //   color: '#378006',
  //   description: "test",
  //   location: "CULC",
  //   tags: ["1", "2", "3"],
  //   createdBy: "mKtoQGEkxkcSV42vDuedyxb8FJ33"
  // }])
  const [events, setEvents] = useState([])
  const [modalData, setModalData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"))
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
          createdBy: doc.data().createdBy
        }
      })
    })
    randomColor({ count: docs.length }).forEach((color, idx) => {
      docs[idx].color = color
    })
    console.log(docs)
    setEvents(docs)
  }

  Modal.setAppElement('#root')
  const handleClick = (info) => {
    if (!modalOpen) {
      setModalOpen(true)
    }
    setModalData(info.event)
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
        style={{ overlay: { zIndex: 1000 }, content: { height: "40vh", width: "50vw", left: "27%" } }}
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
          <div><span style={{ fontWeight: "bold" }}>Created By:</span> <span className="text-primary">{modalData.extendedProps.createdBy}</span></div>
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
        events={events}
        dayMaxEvents={true}
        eventClick={handleClick}
      />

    </div>
  )
}

export default Calendar
