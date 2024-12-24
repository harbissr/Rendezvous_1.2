import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Weather from "../components/Weather";
import DateCard from "../components/DateCard";
import CreateEvent from "../components/CreateEvent";
import EventList from "../components/EventList";

export default function HomePage() {

  return (
    <>
        <div className="home-container">
            <div className="main-content">
                <h2>Home</h2>
            </div>
            <div className="sidebar">
                <Weather />
                <DateCard />
            </div>
        </div>
    </>
  );
}