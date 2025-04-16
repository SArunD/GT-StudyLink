import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId} from './event-utils'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

let calendarApi;
let info;
let sName;
let sTags;
let sDesc;
let sTimes;
let seeSession;


export default function CalendarApp() {
    const [currentEvents, setCurrentEvents] = useState([])
    const [seeCreate, setSeeCreate] = useState(false)

    function toggleCreate () {
        setSeeCreate(!seeCreate);
    };
  
    function handleDateSelect(selectInfo) {
        calendarApi = selectInfo.view.calendar
        info = selectInfo;
        toggleCreate();
    }

  
    function handleEventClick(clickInfo) {
        sName = document.getElementById("sName");
        sTags = document.getElementById("sTags");
        sTimes = document.getElementById("sTimes");
        sDesc = document.getElementById("sDesc");
        seeSession = document.getElementById("seeSession");
        document.getElementById("sessionClose").onclick = function(){seeSession.style.visibility="hidden"};

        //change info
        sName.textContent = clickInfo.event.title;
        // sTags.textContent = clickInfo.event.title;
        // ****** NEED TO ADD TAGS, FORMAT TIME **********
        sTimes.textContent = clickInfo.event.start + " - " + clickInfo.event.end;
        sDesc.textContent = clickInfo.event.description;
        console.log(clickInfo.event);

        // show popup
        seeSession.style.visibility="visible";
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
            {seeCreate ? <CreateSession toggle={toggleCreate} /> : null}
            <div className="popup" id="seeSession">
                <div className="popup-inner">
                    <h2 id="sName">Name</h2>
                    <label id="sTags">
                        Tags:
                    </label>
                    <label id="sTimes">
                        Time:
                    </label>
                    <p id="sDesc">
                        Description:
                    </p>
                    <button id="sessionClose">Close</button>
                </div>
            </div>
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
    //****************** TO DO: CONNECT TIME PICKER TO CREATING STUDY SESSION, clean up login, add tag functionality **********************************
    const [sName, setSName] = useState('')
    const [sTag, setSTag] = useState('')
    const [sDesc, setSDesc] = useState('')
    const [pStart, setPStart] = useState('')
    const [pEnd, setPEnd] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        // **************** TO DO: REPLACE TEMP VAL  ***************************
        addSession(sName, sDesc, pStart, pEnd)
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
                    <label>
                        Description:
                        <input type="text" value={sDesc} onChange={e => setSDesc(e.target.value)} />
                    </label>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="Start time" onChange={e => setPStart(e)}/>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="End time" onChange={e => setPEnd(e)}/>
                        </LocalizationProvider>
                    </div>
                    <button type="submit">Add Session</button>
                </form>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}

function addSession(title, description, start, end) {
    let newStart = info.startStr.substring(0, 10) + "T" + start.hour() + ":" + start.minute() + ":" + start.second();
    let newEnd = info.endStr.substring(0, 10) + "T" + end.hour() + ":" + end.minute() + ":" + end.second();
    if (title) {
        calendarApi.addEvent({
            id: createEventId(),
            title,
            start: newStart.replace(/T.*$/, ''),
            end: newEnd.replace(/T.*$/, ''),
            allDay: false,
            description
        })
        }
    calendarApi.unselect() // clear date selection
}

function hideSession() {
    console.log("hide")
    console.log(seeSession)
    if (seeSession) {
        seeSession.style.visibility="hidden";
    }
}




// function SeeSession(props) {
//     return (
//         <div className="popup">
//             <div className="popup-inner">
//                 <h2 id="sName">Name</h2>
//                 <label id="sTags">
//                     Tags:
//                 </label>
//                 <label id="sTimes">
//                     Time:
//                 </label>
//                 <p id="sDesc">
//                     Description:
//                 </p>
//                 <button onClick={hideSession()}>Close</button>
//             </div>
//         </div>
//     )
// }