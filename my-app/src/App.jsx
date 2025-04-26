import { Route, Routes } from "react-router"

import AddEvent from "./pages/AddEvent"
import { AuthProvider } from "./utils/AuthContext"
import Events from "./pages/Events"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import React from "react"
import Register from "./pages/Register"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/events/add" element={<AddEvent />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
