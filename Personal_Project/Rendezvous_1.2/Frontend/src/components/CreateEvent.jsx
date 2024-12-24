import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import EventList from './EventList';

const CreateEvent = ({ onEventCreated }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState(null);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const organization_id = import.meta.env.VITE_EVENTBRITE_ORGANIZATION_ID;
    const privateToken = import.meta.env.VITE_EVENTBRITE_PRIVATE_TOKEN;

    // Format the start and end times to the required format
    const formattedStartTime = moment(startTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    const formattedEndTime = moment(endTime).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

    const eventData = {
      event: {
        name: {
          html: eventName,
        },
        start: {
          timezone: 'America/New_York',
          utc: formattedStartTime,
        },
        end: {
          timezone: 'America/New_York',
          utc: formattedEndTime,
        },
        currency: currency,
      },
    };

    try {
      const eventbriteResponse = await axios.post(
        `https://www.eventbriteapi.com/v3/organizations/${organization_id}/events/`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${privateToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      
    // Extract event details from Eventbrite response
    const { name, start, end, currency } = eventbriteResponse.data;

    // Prepare data for your backend API
    const backendEventData = {
        name: name.html,
        start_time: start.utc,
        end_time: end.utc,
        currency: currency,
        creator_email: "jj@ii.com",
    };
    console.log('Backend Event Data:', backendEventData);

    // Make a POST request to your backend API to store the event details
    const token = localStorage.getItem("token");
    const backendResponse = await axios.post(
        'http://127.0.0.1:8000/api/v1/events/create/',
        backendEventData,
        {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    console.log('Backend Response:', backendResponse.data);

      onEventCreated(eventbriteResponse.data); // Pass the new event data back to the parent
      setEventName('');
      setStartTime('');
      setEndTime('');
      setCurrency('USD');
    } catch (err) {
        console.error('Error:', err);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="create-event">
      <h2>Create Event</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleCreateEvent}>
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;