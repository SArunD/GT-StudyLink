import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import React, { useContext } from 'react'

import { AuthContext } from "../utils/AuthContext"
import { useNavigate } from "react-router"

function Header() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    const proceed = confirm("You are about to Logout, do you want to proceed?")
    if (proceed) {
      setUser(null)
      localStorage.removeItem("user")
      console.log("Logged Out Current User")
    }
  }

  return (
    <Nav
      variant="underline"
      activeKey="/home"
    >
      <Nav.Item>
        <Nav.Link className="fs-4" href="/home"><i className="bi bi-book"></i> StudyLink</Nav.Link>
      </Nav.Item>
      <Nav.Item className="pt-2">
        <Nav.Link href="/events">Events</Nav.Link>
      </Nav.Item>
      
      {user ? (
        <>
          <Nav.Item className="ms-auto">
            <Button 
              variant="danger mt-2" 
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </Nav.Item>
        </>
      ) : (
        <Nav.Item className="ms-auto">
          <Button 
            variant="outline-primary mt-2" 
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Nav.Item>
      )}
    </Nav>
  )
}

export default Header