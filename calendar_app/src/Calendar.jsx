// Template 

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import './Calendar.css'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { useState } from 'react';


export default function Calendar() {
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }

  return (
    <>
    <div id='layout'>
      <div id='all-events-box'>
        <MasterList currentEvents={currentEvents}/>
        <table></table>
      </div>
      <div> <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        selectable={true}
        //initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventsSet={handleEvents}
      /> </div> 
    </div>
      <div>
        <Total365 currentEvents={currentEvents}/>
      </div>
    </>
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

function MasterList({currentEvents}){
  return(
    currentEvents.map((event) => (
        <tr>
          <td>{event.title}</td>
          <td>{new Date(event.start).toISOString()}</td>
        </tr>
    ))
  )
}

function Total365({ currentEvents }) {
  const uniqueDates = new Set();

  currentEvents.forEach((event) => {
    const dateStr = new Date(event.start).toISOString().slice(0, 10);
    uniqueDates.add(dateStr);
  });

  return (
    <p>{uniqueDates.size}{' out of 365'}</p>
  );
}
