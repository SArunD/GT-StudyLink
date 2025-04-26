import { Navigate, Outlet } from "react-router"

import { AuthContext } from "./AuthContext"
import { useContext } from "react"

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext)
    const storedUser = localStorage.getItem("user")

    return (user || storedUser) ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
