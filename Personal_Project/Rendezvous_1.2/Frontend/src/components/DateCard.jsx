import React from "react";
import moment from "moment";
import "./DateCard.css";

const DateCard = () => {
    const today = moment().format("dddd, MMMM Do YYYY"); // Today's date
    return (
        <div className="date-card">
            <h2>Today's Date</h2>
            <p>{today}</p>
        </div>
    );
};

export default DateCard;