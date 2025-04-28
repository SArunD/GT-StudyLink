import React, { useContext, useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'

import { AuthContext } from '../utils/AuthContext'
import { MultiSelect } from "react-multi-select-component"
import { db } from "../lib/firebaseConfig"

function AddEvent() {
  const { user } = useContext(AuthContext)
  const [tags, setTags] = useState([])
  const [selected, setSelected] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)
  
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

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    console.log(e.target[3].value)
    console.log(e.target[4].value)

    await addDoc(collection(db, "events"), {
      title: e.target[0].value,
      location: e.target[1].value,
      date: e.target[2].value,
      startTime: e.target[3].value,
      endTime: e.target[4].value,
      rsvp: e.target[5].value,
      tags: selected.map((item) => item.label),
      details: e.target[7].value,
      createdBy: user.email
    })
    .then(() => {
      alert("Event Saved Successfully!")
    })
    .catch((err) => {
      alert("Event Creation Failed: ", err)
    })
    
    document.getElementById('eventForm').reset()
    setSubmitted(false)
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Create New Event</h3>
            </div>
            <div className="card-body">
              <form id="eventForm" onSubmit={handleSave}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="title" className="form-label mb-1">Event Title</label>
                    <input 
                      id="title"
                      name="title" 
                      placeholder="Enter event title" 
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="location" className="form-label mb-1">Location</label>
                    <input 
                      id="location"
                      name="location" 
                      placeholder="Building, Room (ex: CULC, 152)" 
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="date" className="form-label mb-1">Date</label>
                    <input 
                      id="date"
                      name="date" 
                      type="date"
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="startTime" className="form-label mb-1">Start Time</label>
                    <input 
                      id="startTime"
                      name="startTime" 
                      type="time" 
                      className="form-control" 
                      style={{ height: "calc(2.375rem + 2px)" }} 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="endTime" className="form-label mb-1">End Time</label>
                    <input 
                      id="endTime"
                      name="endTime" 
                      type="time" 
                      className="form-control" 
                      style={{ height: "calc(2.375rem + 2px)" }} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="rsvpLimit" className="form-label mb-1">RSVP Limit</label>
                    <input 
                      id="rsvpLimit"
                      name="rsvpLimit" 
                      type="number" 
                      min="1"
                      placeholder="Maximum number of participants" 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label mb-1">Tags</label>
                    <MultiSelect
                      options={tags}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select tags" 
                      isCreatable
                      hasSelectAll={false}
                      className="custom-multiselect"
                      isLoading={isLoading}
                    />
                    {selected.length === 0 && (
                      <small className="text-danger">Please select at least one tag.</small>
                    )}
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="details" className="form-label mb-1">Event Details</label>
                    <textarea 
                      id="details"
                      name="details" 
                      placeholder="Describe your event (topic/class, study plan, etc.)" 
                      className="form-control" 
                      rows="4"
                      required
                    />
                  </div>
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={selected.length == 0 ? true : false}
                  >
                    {selected.length == 0 ? "Select at least one tag." : 
                    !isSubmitted ? "Create Event" : "Creating Event..."}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
