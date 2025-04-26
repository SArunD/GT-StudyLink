import React, { useContext, useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'

import { AuthContext } from '../utils/AuthContext'
import { MultiSelect } from "react-multi-select-component"
import { db } from "../lib/firebaseConfig"

function AddEvent() {
  const [tags, setTags] = useState([])
  const [selected, setSelected] = useState([])
  const [isLoading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    setLoading(true)
    const snapshot = await getDocs(collection(db, "tags"))
    const docs = []
    snapshot.forEach((doc) => {
      docs.push({ label: doc.data().name, value: doc.data().name })
    })
    setLoading(false)
    setTags(docs)
  }

  const handleSubmit = async (e) => {
    await addDoc(collection(db, "events"), {
      title: e.get("title"),
      location: e.get("location"),
      date: e.get("date"),
      startTime: e.get("startTime"),
      endTime: e.get("endTime"),
      details: e.get("details"),
      rsvp: Number(e.get("rsvpLimit")),
      tags: selected.map((item) => item.label),
      createdBy: user.uid,
    })
    .then(
      setSelected([]),
      alert("saved!")
    )
    .catch((err) => {
      alert(err)
    })
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>Add Event</h2>
      <form action={handleSubmit}>
        <input name='title' placeholder='Event Title' required />
        <input name='location' placeholder='Event Location (Building, Room)' type='location' required />
        <input name='date' type='date' required />
        <label htmlFor="startTime">Start Time:</label>
        <input name='startTime' type='time' required />
        <label htmlFor="endTime">End Time:</label>
        <input name='endTime' type='time' required />
        <input name='rsvpLimit' type='number' placeholder='RSVP Limit' required />
        <textarea name="details" id="" placeholder='Event Details'></textarea>
        <MultiSelect
          options={tags}
          value={selected}
          onChange={setSelected}
          isCreatable
          isLoading={isLoading}
          required
        />
        {selected.length > 0 ?
        (<button type='submit'>Save</button>) :
        (<h2>Select at least one tag</h2>)}
      </form>
    </div>
  )
}

export default AddEvent
