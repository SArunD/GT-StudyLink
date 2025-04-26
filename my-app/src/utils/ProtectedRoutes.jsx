import { Navigate, Outlet } from "react-router"

import { AuthContext } from "./AuthContext"
import Header from "../components/Header"
import { useContext } from "react"

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext)
    const storedUser = localStorage.getItem("user")

    return (user || storedUser) ? <Outlet /> : <Navigate to="/events" />
}

export default ProtectedRoutes
