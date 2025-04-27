import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';

import { AuthContext } from "../utils/AuthContext"

function Header() {
  const { user } = useContext(AuthContext)

  return (
    <header style={{ border: "2px solid red" }}>
      <Nav
        variant="pills"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/home">StudyLink</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link href="/events">Calendar</Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link href="/events">View All Events</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/events/add">Create an Event</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link href="/home">View Events</Nav.Link>
        </Nav.Item> */}
      </Nav>
        {user ? <h2>Logged IN</h2> : <h2>Not Logged</h2>}
    </header>
  )
}

export default Header