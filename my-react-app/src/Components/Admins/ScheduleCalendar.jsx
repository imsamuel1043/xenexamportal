import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer
} from "react-big-calendar";

import {
  format,
  parse,
  startOfWeek,
  getDay
} from "date-fns";

import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../assets/Css/Schedule.css"; 


const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const ScheduleCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "js Exam",
      start: new Date(2025, 1, 22, 9, 0),
      end: new Date(2025, 1, 22, 10, 0),
      color: "#4e73df"
    }
  ]);

 
  const handleSlotSelect = ({ start, end }) => {
    const title = prompt("Enter schedule name:");

    if (title) {
      setEvents([
        ...events,
        {
          title,
          start,
          end,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16)
        }
      ]);
    }
  };

  
  const handleEventSelect = (event) => {
    if (window.confirm(`Delete "${event.title}"?`)) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "10px",
        padding: "5px 8px",
        color: "white",
        border: "none",
        display: "block",
        fontSize: "13px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.12)"
      }
    };
  };

  
  const slotPropGetter = () => ({
    style: {
      backgroundColor: "#fafafa",
      borderRadius: "8px"
    }
  });

  return (
    <div
      className="shadow-sm p-3"
      style={{
        background: "white",
        borderRadius: "15px",
        height: "475px",
        marginTop: "20px"
      }}
    >
      <h4 className="fw-bold mb-3 schedule">Schedule Calendar</h4>

      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        eventPropGetter={eventStyleGetter}
        slotPropGetter={slotPropGetter}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 380,
          borderRadius: "15px",
          padding: "10px",
          background: "#fff"
        }}
      />
    </div>
  );
};

export default ScheduleCalendar;
