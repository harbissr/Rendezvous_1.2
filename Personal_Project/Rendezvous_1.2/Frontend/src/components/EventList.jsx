import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Your Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              {event.name.html} - {event.start.utc}
            </li>
          ))
        ) : (
          <li>No events created yet.</li>
        )}
      </ul>
    </div>
  );
};

export default EventList;