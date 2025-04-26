import { Route, Routes } from "react-router"

import Home from "./pages/Home"
import Login from "./pages/Login"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import React from "react"
import Register from "./pages/Register"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
