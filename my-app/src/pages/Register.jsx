import React, { useContext } from 'react'
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { auth, db } from "../lib/firebaseConfig"

import { AuthContext } from "../utils/AuthContext"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router'

function Register() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const addUser = async (e) => {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      lastActive: Timestamp.now()
    })
    return docRef.id
  }

  const signUp = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, e.target[2].value, e.target[3].value)
    .then(async (userCredentials) => {
      let user = userCredentials.user
      const id = addUser(e)
      
      user.uid = await id
      setUser(user)
      navigate("/home")
      console.log("Registered With: ", user.email)
    })
    .catch((err) => {
      if (err.code == "auth/invalid-email") {
        alert("Invalid Email: Please enter a valid email!")
      } else if (err.code == "auth/weak-password") {
        alert("Weak Password: Please enter a stronger password!")
      } else if (err.code == "auth/email-already-in-use") {
        alert("Invalid Register: Email Already Exists! Try Login Instead.")
      }
    })
  }

  return (
    <div>
      <div className="container card p-4 shadow" style={{ maxWidth: "450px" }}>
      <h3 className="mb-4 text-center">Register</h3>
      <form onSubmit={signUp}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label mb-1">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <input 
              id="firstName"
              name="firstName" 
              placeholder="First Name" 
              className="form-control" 
              required 
              autoComplete="true"
            />
            <input 
              id="lastName"
              name="lastName" 
              placeholder="Last Name" 
              className="form-control" 
              required 
              autoComplete="true"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mb-1">Email Address</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input 
              id="email"
              name="email" 
              type="email"
              placeholder="you@example.com"
              className="form-control" 
              required
              autoComplete="true"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label mb-1">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Choose a secure password" 
              className="form-control" 
              required 
              autoComplete="true"
            />
          </div>
          <small className="text-muted">Must be at least 6 characters</small>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
          Create Account
        </button>
        <p className="text-center p-0 m-0">
          Already have an account? <button className="btn btn-link p-0 m-0" onClick={() => navigate("/login")}>Login</button>
        </p>
      </form>
      </div>
    </div>
  )
}

export default Register