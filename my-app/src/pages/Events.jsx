import "../styles/Events.css"

import React, { useState } from 'react'

import Calendar from "../components/Calendar"
import Table from "../components/Table"

function Events() {
  const [isCalendar, setIsCalendar] = useState(true)

  const handleView = (val) => {
    if (val == 0) {
      setIsCalendar(true)
    } else {
      setIsCalendar(false)
    }
  }
  
  return (
    <div style={{ border: "2px solid black" }}>
        <button onClick={() => handleView(0)}>Calendar</button>
        <button onClick={() => handleView(1)}>Table/Tile</button>
        {isCalendar ? (<Calendar />) : (<Table />)}
    </div>
  )
}

export default Events