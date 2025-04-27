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
      console.log("Registered With: ", user.email)
      navigate("/")
    })
    .catch((err) => {
      alert(err)
    })
  }

  return (
    // <div style={{ border: "2px solid black" }}>
    //   <h2>Register</h2>
      
    //   <form action={signUp}>
    //     <input name='name' placeholder='Name' />
    //     <input name='email' placeholder='Email' />
    //     <input name='password' placeholder='Password' type='password' />
    //     <button type="submit">Register</button>
    //   </form>
      
    //   <button onClick={() => navigate("/login")}>Login?</button>
    // </div>
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 text-center">Create Account</h3>
        </div>
        <div className="card-body p-4">
          <form action={signUp}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input 
                  id="name"
                  name="name" 
                  placeholder="Enter your name" 
                  className="form-control" 
                  required 
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
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
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
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
                />
              </div>
              <small className="text-muted">Must be at least 6 characters</small>
            </div>
            
            <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
              Create Account
            </button>
          </form>
          
          <div className="text-center">
            <p className="mb-0">Already have an account?</p>
            <button 
              onClick={() => navigate("/login")}
              className="btn btn-link"
              >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register