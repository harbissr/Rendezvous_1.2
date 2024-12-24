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
  let event_id = ''

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const organization_id = import.meta.env.VITE_EVENTBRITE_ORGANIZATION_ID;
    const token = import.meta.env.VITE_EVENTBRITE_PRIVATE_TOKEN;

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
      const response = await axios.post(
        `https://www.eventbriteapi.com/v3/organizations/${organization_id}/events/`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onEventCreated(response.data); // Pass the new event data back to the parent
      setEventName('');
      setStartTime('');
      setEndTime('');
      setCurrency('USD');
    } catch (err) {
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