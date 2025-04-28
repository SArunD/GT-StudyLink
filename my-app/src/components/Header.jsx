import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';

import { AuthContext } from "../utils/AuthContext"

function Header() {
  const { user } = useContext(AuthContext)

  return (
    <header className="ms-2 pt-2">
      <Nav
        variant="underline"
        activeKey="/home"
      >
        <Nav.Item>
          <Nav.Link className="fs-4" href="/home">StudyLink</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link href="/events">Calendar</Nav.Link>
        </Nav.Item> */}
        <Nav.Item className="pt-2">
          <Nav.Link href="/events">View All Events</Nav.Link>
        </Nav.Item>
        <Nav.Item className="pt-2">
          <Nav.Link href="/events/add">Create an Event</Nav.Link>
        </Nav.Item>
        <Nav.Item className="pt-2">
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link href="/home">View Events</Nav.Link>
        </Nav.Item> */}
      </Nav>
    </header>
  )
}

export default Header