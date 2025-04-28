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
  const [submitted, setSubmitted] = useState(false)
  
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
    setSubmitted(true)
    try {
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
      setSelected([])
      setSubmitted(false)
  
    // .catch((err) => {
    //   alert(err)
    document.getElementById('successAlert').classList.remove('d-none');
    setTimeout(() => {
      document.getElementById('successAlert').classList.add('d-none');
    }, 3000);
    
    // Reset form
    document.getElementById('eventForm').reset();
  } catch (err) {
    setSubmitted(false);
    alert(err);
    }
  }

  return (
    // <div style={{ border: "2px solid black" }}>
    //   <h2>Add Event</h2>
    //   <form action={handleSubmit}>
    //     <input name='title' placeholder='Event Title' required />
    //     <input name='location' placeholder='Event Location (Building, Room)' type='location' required />
    //     <input name='date' type='date' required />
    //     <label htmlFor="startTime">Start Time:</label>
    //     <input name='startTime' type='time' required />
    //     <label htmlFor="endTime">End Time:</label>
    //     <input name='endTime' type='time' required />
    //     <input name='rsvpLimit' type='number' placeholder='RSVP Limit' required />
    //     <textarea name="details" id="" placeholder='Event Details'></textarea>
    //     <MultiSelect
    //       options={tags}
    //       value={selected}
    //       onChange={setSelected}
    //       isCreatable
    //       isLoading={isLoading}
    //       required
    //     />
    //     {selected.length > 0 ?
    //     (<button type='submit'>Save</button>) :
    //     (<h2>Select at least one tag</h2>)}
    //   </form>
    // </div>
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Create New Event</h3>
            </div>
            <div className="card-body">
              <div id="successAlert" className="alert alert-success d-none" role="alert">
                Event created successfully!
              </div>
              
              <form id="eventForm" action={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="title" className="form-label">Event Title</label>
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
                    <label htmlFor="location" className="form-label">Location</label>
                    <input 
                      id="location"
                      name="location" 
                      placeholder="Building, Room (e.g., CULC 152)" 
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input 
                      id="date"
                      name="date" 
                      type="date"
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="startTime" className="form-label">Start Time</label>
                    <input 
                      id="startTime"
                      name="startTime" 
                      type="time" 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="endTime" className="form-label">End Time</label>
                    <input 
                      id="endTime"
                      name="endTime" 
                      type="time" 
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="rsvpLimit" className="form-label">RSVP Limit</label>
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
                    <label className="form-label">Tags</label>
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
                      <small className="text-danger">Please select at least one tag</small>
                    )}
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-md-12">
                    <label htmlFor="details" className="form-label">Event Details</label>
                    <textarea 
                      id="details"
                      name="details" 
                      placeholder="Describe your event (topics, requirements, what to bring, etc.)" 
                      className="form-control" 
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="d-grid">
                  {selected.length > 0 ? (
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg" 
                      disabled={submitted}
                    >
                      {submitted ? 'Creating Event...' : 'Create Event'}
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="btn btn-primary btn-lg" 
                      disabled
                    >
                      Select at least one tag
                    </button>
                  )}
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
