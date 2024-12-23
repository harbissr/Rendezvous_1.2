import React, { useState, useEffect } from "react";
import axios from "axios";
import EventList from "../components/EventList";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://eventbriteapi.com/v3/events");
        setEvents(response.data); // Assume the API returns a list of events
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <h1>All Events</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;