import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import DateCard from "../components/DateCard";
import EventList from "../components/EventList";
import axios from "axios";


export default function HomePage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/v1/events/", {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

  return (
    <>
        <div className="home-container">
            <div className="main-content">
                <h2>Home</h2>
                
            </div>
            <div className="date-card-container">
                <DateCard />
            </div>
            <div>
                <EventList events={events} />
            </div>
            <div className="sidebar">
                <Weather />
            </div>
        </div>
    </>
  );
}