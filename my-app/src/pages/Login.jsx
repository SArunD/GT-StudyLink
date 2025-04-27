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
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Login</h2>
        <form action={signIn}>
          <div className="mb-3">
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/register")}
          className="btn btn-link w-100"
        >
          Register?
        </button>
      </div>
    </div>
  )
}

export default Login