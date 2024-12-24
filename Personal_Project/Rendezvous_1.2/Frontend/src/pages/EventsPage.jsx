import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "../components/CreateEvent";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/events/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include token if required
          },
        });
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  const handleEventCreated = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="events-page">
      <h1>My Events</h1>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <CreateEvent onEventCreated={handleEventCreated} />
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {new Date(event.start_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;