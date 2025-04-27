import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

let calendarApi;
let info;
let sName;
let sTags;
let sDesc;
let sTimes;
let seeSession;

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]
function createEventId() {
  return String(eventGuid++)
}

/***** TO DO:
 * ADD TAG FUNCTIONALITY, FORMAT TIME ON EVENT INFO POPUP, 
 * ADD EVENT LIST VIEW, ADD FILTERING
 */

// export default function Calendar() {
//   return(
//     <h2>calendar</h2>
//   )
// }


export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([])
  
    function handleDateSelect(selectInfo) {
    }

  
    function handleEventClick(clickInfo) {
    //     sName = document.getElementById("sName");
    //     sTags = document.getElementById("sTags");
    //     sTimes = document.getElementById("sTimes");
    //     sDesc = document.getElementById("sDesc");
    //     seeSession = document.getElementById("seeSession");
    //     document.getElementById("sessionClose").onclick = function(){seeSession.style.visibility="hidden"};

    //     //change info
    //     sName.textContent = clickInfo.event.title;
    //     // sTags.textContent = clickInfo.event.extendedProps.tags;
    //     // ****** NEED TO ADD TAGS, FORMAT TIME **********
    //     sTimes.textContent = clickInfo.event.start + " - " + clickInfo.event.end;
    //     sDesc.textContent = clickInfo.event.extendedProps.description;
    //     console.log(clickInfo.event);

    //     // show popup
    //     seeSession.style.visibility="visible";
    //     //****** FUNCTION TO REMOVE EVENT (FOR LATER USE) ************
    // //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    // //     clickInfo.event.remove()
    // //   }
    }
  
    function handleEvents(events) {
      setCurrentEvents(events)
    }
  
    return (
      
      <div>
        <h2>demo</h2>
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
      //   <div>
      //       {seeCreate ? <CreateSession toggle={toggleCreate} /> : null}
      //       <div className="popup" id="seeSession">
      //           <div className="popup-inner">
      //               <h2 id="sName">Name</h2>
      //               <label id="sTags">
      //                   Tags:
      //               </label>
      //               <label id="sTimes">
      //                   Time:
      //               </label>
      //               <p id="sDesc">
      //                   Description:
      //               </p>
      //               <button id="sessionClose">Close</button>
      //           </div>
      //       </div>
      //   </div>
      
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