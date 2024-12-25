import React from "react";
import "./HomePage.css";
import Weather from "../components/Weather";
import DateCard from "../components/DateCard";


export default function HomePage() {

  return (
    <>
        <div className="home-container">
            <div className="main-content">
                <h2>Home</h2>
                
            </div>
            <div className="date-card-container">
                <DateCard />
            </div>
            <div className="sidebar">
                <Weather />
            </div>
        </div>
    </>
  );
}