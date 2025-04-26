import React, { useContext } from 'react'

import { AuthContext } from "../utils/AuthContext"

function Header() {
  const { user } = useContext(AuthContext)

  return (
    <header style={{ border: "2px solid red" }}>
        Header
        {user ? <h2>Logged IN</h2> : <h2>Not Logged</h2>}
    </header>
  )
}

export default Header