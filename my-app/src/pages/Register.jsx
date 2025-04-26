import React from 'react'
import { useNavigate } from 'react-router'

function Register() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/login")
  }

  const handleSubmit = (e) => {
    console.log(e.get("username"))
    console.log(e.get("password"))
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Register</h2>
      
      <form action={handleSubmit}>
        <input name='gtid' placeholder='GI ID' />
        <input name='name' placeholder='Name' />
        <input name='username' placeholder='Username' />
        <input name='password' placeholder='Password' type='password' />
        <button type="submit">Register</button>
      </form>
      
      <button onClick={handleNavigate}>Login?</button>
    </div>
  )
}

export default Register