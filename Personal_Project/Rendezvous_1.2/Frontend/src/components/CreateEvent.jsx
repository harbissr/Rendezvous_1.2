import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
// import "./CreateEvent.css";

const CreateEvent = ({ onEventCreated }) => {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    // const [eventDate, setEventDate] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [error, setError] = useState(null);

    const handleCreateEvent = async () => {
        const organization_id = import.meta.env.VITE_EVENTBRITE_ORGANIZATION_ID;
        const privateToken = import.meta.env.VITE_EVENTBRITE_PRIVATE_TOKEN;

        const formattedStartTime = moment(startTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        const formattedEndTime = moment(endTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        try {
            const response = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${organization_id}/events/`, 
            {
                event: {
                    name: {
                        html: eventName,
                    },
                    start: {
                        timezone: "America/New_York",
                        utc: formattedStartTime,
                    },
                    end: {
                        timezone: "America/New_York",
                        utc: formattedEndTime,
                    },
                    privacty_setting: "locked",
                    currency: currency,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${privateToken}`,
                    "Content-Type": "application/json",
            },
        }
        );
            onEventCreated(response.data);
            setEventName(""); 
            setStartTime("");
            setEndTime("");
            // setEventDate("");
            setCurrency("USD");
        }catch (error) {
            setError(error.response?.data?.error || "An unexpected error occurred.");
        }
    };

    return (
        <>
        <div className="create-event">
            <h2>Create Event</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />

            <input
                type="datetime-local"
                placeholder="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />

            <input
                type="datetime-local"
                placeholder="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />

            <input
                type="text"
                placeholder="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />

            <button onClick={handleCreateEvent}>Create Event</button>
        </div>
        </>
    );
};

export default CreateEvent;