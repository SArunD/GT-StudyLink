import React from 'react'
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/register")
  }

  const handleSubmit = (e) => {
    console.log(e.get("username"))
    console.log(e.get("password"))
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Login</h2>
      
      <form action={handleSubmit}>
        <input name='username' placeholder='Username' />
        <input name='password' placeholder='Password' type='password' />
        <button type="submit">Login</button>
      </form>
      
      <button onClick={handleNavigate}>Register?</button>
    </div>
  )
}

export default Login