import React, { useContext } from 'react'
import { Timestamp, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { auth, db } from "../lib/firebaseConfig"

import { AuthContext } from '../utils/AuthContext'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const updateUser = async (e) => {
    const qryRef = await query(collection(db, "users"), where("email", "==", e.target[0].value))
    const qrySnap = await getDocs(qryRef)

    if (qrySnap.empty) {
      alert("User doesn't exist!")
    }
    
    await updateDoc(qrySnap.docs[0].ref, {
      lastActive: Timestamp.now()
    })
    
    return qrySnap.docs[0].ref.id
  }

  const signIn = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value)
    .then(async (userCredentials) => {
      let user = userCredentials.user
      const id = updateUser(e)
      
      user.uid = await id
      console.log(user)
      setUser(user)
      navigate("/home")
      console.log("Logged In With: ", e.target[0].value)
    })
    .catch((err) => {
      if (err.code == "auth/invalid-credential") {
        alert("Wrong Username or Password! Please enter the correct crendentials.")
      }
    })
  }

  return (
    <div>
      <div className="container card p-4 shadow" style={{ maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={signIn}>
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
            Login
          </button>
          <p className="text-center p-0 m-0">
            Don't have an account? <button className="btn btn-link p-0 m-0" onClick={() => navigate("/register")}>Register</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login