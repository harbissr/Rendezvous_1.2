import React, { useState } from "react";
import axios from "axios";

const CreateEvent = ({ onEventCreated }) => {
  const [eventData, setEventData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    currency: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/events/create/",
        eventData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the token if required
          },
        }
      );
      onEventCreated(response.data); // Pass the new event data back to the parent
    } catch (err) {
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={eventData.name}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="start_time"
        value={eventData.start_time}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="end_time"
        value={eventData.end_time}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="currency"
        placeholder="Currency"
        value={eventData.currency}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;