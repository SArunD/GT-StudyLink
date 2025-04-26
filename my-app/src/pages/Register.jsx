import React, { useContext } from 'react'
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../lib/firebaseConfig"

import { AuthContext } from "../utils/AuthContext"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router'

function Register() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const addUser = async (e) => {
    await addDoc(collection(db, "users"), {
      name: e.get("name"),
      email: e.get("email")
    })
  }

  const signUp = async (e) => {
    await createUserWithEmailAndPassword(auth, e.get("email"), e.get("password"))
    .then((userCredentials) => {
      const user = userCredentials.user
      addUser(e)
      setUser(user)
      console.log("Signed Up With: ", user.email)
      navigate("/")
    })
    .catch((err) => {
      alert(err)
    })
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Register</h2>
      
      <form action={signUp}>
        <input name='name' placeholder='Name' />
        <input name='email' placeholder='Email' />
        <input name='password' placeholder='Password' type='password' />
        <button type="submit">Register</button>
      </form>
      
      <button onClick={() => navigate("/login")}>Login?</button>
    </div>
  )
}

export default Register