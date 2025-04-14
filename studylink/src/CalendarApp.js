import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

let calendarApi;


export default function DemoApp() {
    const [currentEvents, setCurrentEvents] = useState([])
    const [seen, setSeen] = useState(false)

    function togglePop () {
        setSeen(!seen);
    };
  
    function handleDateSelect(selectInfo) {
        togglePop();
        //************ CHANGE TO: NEW EVENT FORM *************************************
    //   let title = prompt('Please enter a new title for your event')
        calendarApi = selectInfo.view.calendar
    }

  
    function handleEventClick(clickInfo) {
        //********** CHANGE TO: SHOW EVENT INFO ***********************
    //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove()
    //   }
    }
  
    function handleEvents(events) {
      setCurrentEvents(events)
    }
  
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
        <div>
            <button onClick={togglePop}>Create a new study session</button>
            {seen ? <CreateSession toggle={togglePop} /> : null}
        </div>
      </div>
    )
  }

function renderEventContent(eventInfo) {
    return (
        <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        </>
    )
}

function CreateSession(props) {
    const [sName, setSName] = useState('')
    const [sTag, setSTag] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        // Code to handle login goes here
        props.toggle()
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Create a Study Session</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Name of Study Session:
                        <input type="text" value={sName} onChange={e => setSName(e.target.value)} />
                    </label>
                    <label>
                        Tags:
                        <input type="text" value={sTag} onChange={e => setSTag(e.target.value)} />
                    </label>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="Start time" />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="End time" />
                        </LocalizationProvider>
                    </div>
                    
                    <button type="submit" onClick={addSession(sName, 'tempval', 'tempval')}>Add Session</button>
                </form>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}

function addSession(title, start, end) {
    if (title) {
        if (title) {
            calendarApi.addEvent({
              id: createEventId(),
              title,
              start,
              end,
              allDay: false
            })
          }
    }
    calendarApi.unselect() // clear date selection
}