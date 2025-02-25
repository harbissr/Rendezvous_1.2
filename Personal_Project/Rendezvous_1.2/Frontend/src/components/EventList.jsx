import React from "react";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              {event.name} - {new Date(event.start_time).toLocaleDateString()} to {new Date(event.end_time).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>No events scheduled.</li>
        )}
      </ul>
    </div>
  );
};

export default EventList;