import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Weather from "../components/Weather";
import DateCard from "../components/DateCard";
import CreateEvent from "../components/CreateEvent";
import EventList from "../components/EventList";

export default function HomePage() {
    const [events, setEvents] = React.useState([]);

    const handleEventDeleted = (deletedEvent) => {
        setEvents(events.filter((event) => event.id !== deletedEvent.id)); // Remove the deleted event from the list of events
    };

  return (
    <>
        <div className="home-container">
            <div className="main-content">
                <h2>Home</h2>
                <EventList events={events} onEventDeleted={handleEventDeleted} />
            </div>
            <div className="sidebar">
                <Weather />
                <DateCard />
            </div>
        </div>
    </>
  );
}