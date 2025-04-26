import React, { createRef, useEffect, useRef, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'

import { MultiSelect } from "react-multi-select-component"
import { db } from "../lib/firebaseConfig"

function AddEvent() {
  const [tags, setTags] = useState([])
  const [selected, setSelected] = useState([])
  
  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    const snapshot = await getDocs(collection(db, "tags"))
    const docs = []
    snapshot.forEach((doc) => {
      docs.push({ label: doc.data().name, value: doc.data().name })
    })
    setTags(docs)
  }

  const handleSubmit = async (e) => {
    // console.log(e.get("title"))
    // console.log(e.get("location"))
    // console.log(e.get("details"))
    // console.log(e.get("date"))
    // console.log(e.get("time"))
    // console.log(selected)
    
    // setSelected([])

    await addDoc(collection(db, "events"), {
      title: e.get("title"),
      location: e.get("location"),
      date: e.get("date"),
      time: e.get("time"),
      details: e.get("details"),
      tags: selected.map((item) => item.label),
    })
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Add Event</h2>
      <form action={handleSubmit}>
        <input name='title' placeholder='Event Title' />
        <input name='location' placeholder='Event Location (Building, Room)' type='location' />
        <textarea name="details" id="" placeholder='Event Details'></textarea>
        <input name='date' type='date' />
        <input name='time' type='time' />
        <MultiSelect
          options={tags}
          value={selected}
          onChange={setSelected}
          isCreatable
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default AddEvent
