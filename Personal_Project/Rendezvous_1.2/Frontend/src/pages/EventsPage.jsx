import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "../components/CreateEvent";
import EventList from "../components/EventList";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="homepage">
      <h1>Event Management</h1>
      <CreateEvent onEventCreated={handleEventCreated} />
      <EventList events={events} />
    </div>
  );
};

export default HomePage;