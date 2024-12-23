import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/v1/events/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });
        setEvents(response.data); // Update the events state with the list of events
      } catch (error) {
        setError(error.response?.data?.error || 'An unexpected error occurred.');
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/api/v1/events/${eventId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId)); // Update the events state
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting event.");
    }
  };

  return (
    <div className="event-list">
      <h1>Your Events</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              {event.name.html} - {event.start_time}
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
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