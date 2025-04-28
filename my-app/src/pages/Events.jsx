import "../styles/Events.css"

import React, { useContext, useState } from 'react'

import { AuthContext } from "../utils/AuthContext"
import Calendar from "../components/Calendar"
import Table from "../components/Table"
import ViewEvents from './ViewEvents'
import { useNavigate } from 'react-router'

function Events() {
  const [isCalendar, setIsCalendar] = useState(true)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleView = (val) => {
    if (val == 0) {
      setIsCalendar(true)
    } else {
      setIsCalendar(false)
    }
  }
  
  return (
    <div style={{ border: "2px solid black" }}>
        <h2>Events</h2>
        <button onClick={() => handleView(0)}>Calendar</button>
        <button onClick={() => handleView(1)}>Table/Tile</button>

        {isCalendar ? (<Calendar />) : (<Table />)}
        {user ? 
        (
          <div>
            <button onClick={() => navigate("add")}>Add Event?</button>
            <button onClick={() => navigate("view")}>View Created Event?</button>
            {/* <ViewEvents /> */}
          </div>
        ) :
        (<button onClick={() => navigate("/login")}>Login?</button>)}        
    </div>
  )
}

export default Events