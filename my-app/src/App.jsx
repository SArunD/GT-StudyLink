import "./styles/App.css"

import { Route, Routes } from "react-router"

import AddEvents from "./pages/AddEvents"
import { AuthProvider } from "./utils/AuthContext"
import Events from "./pages/Events"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MainLayout from "./utils/MainLayout"
import NotFound from "./pages/NotFound"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import React from "react"
import Register from "./pages/Register"
import ViewEvents from "./pages/ViewEvents"

function App() {
  return (
    <AuthProvider>
      <div id="mainBox">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
              <Route path="/events" element={<Events />} />
              <Route path="*" element={<NotFound />} />
              
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/events/add" element={<AddEvents />} />
                <Route path="/events/view" element={<ViewEvents />} />
              </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
