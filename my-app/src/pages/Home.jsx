import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

import { db } from "../lib/firebaseConfig"
import { terminal } from 'virtual:terminal'

function Home() {
  const [items, setItems] = useState([])

  // useEffect(() => {
  //   async function getToken() {
  //     const testRef = collection(db, "testing")
  //     const testSnap = await getDocs(testRef)

  //     testSnap.forEach((doc) => {
  //       console.log(doc.data())
  //     })
  //   }

  //   getToken()
  // }, [])

  return (
    <div>Home</div>
  )
}

export default Home