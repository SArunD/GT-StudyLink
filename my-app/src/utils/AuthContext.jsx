import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

    // Checks if user is logged or not
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
            console.log("Getting Existing User")
        } else {
            localStorage.removeItem("user")
            console.log("Removing User")
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
