import React, { useContext } from 'react'

import { AuthContext } from '../utils/AuthContext'
import { auth } from "../lib/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const signIn = async (e) => {
    await signInWithEmailAndPassword(auth, e.get("email"), e.get("password"))
    .then((userCredentials) => {
      const user = userCredentials.user
      setUser(user)
      console.log("Logged In With: ", e.get("email"))
      navigate("/")
    })
    .catch((err) => {
      alert(err)
    })
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Login</h2>
      
      <form action={signIn}>
        <input name='email' placeholder='Email' />
        <input name='password' placeholder='Password' type='password' />
        <button type="submit">Login</button>
      </form>
      
      <button onClick={() => navigate("/register")}>Register?</button>
    </div>
  )
}

export default Login