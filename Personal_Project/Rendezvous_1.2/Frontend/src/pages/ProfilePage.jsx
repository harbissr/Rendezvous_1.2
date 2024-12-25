import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from '../components/DeleteButton';

const ProfilePage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/v1/events/', {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setEvents(response.data);
            } catch (err) {
                setError("Failed to fetch user events. Please try again.");
            }
        };

        fetchUserEvents();
    }, []);

    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter((event) => event.id !== eventId));
    }

    return (
        <div className="profile-page">
          <h1>Profile</h1>
          <h2>Your Events</h2>
          {error && <p className="error">{error}</p>}
          <ul>
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id}>
                  {event.name} - {new Date(event.start_time).toLocaleString()} to {new Date(event.end_time).toLocaleString()}
                  <DeleteButton eventId={event.id} onDelete={handleDeleteEvent} />
                </li>
              ))
            ) : (
              <li>No events created yet.</li>
            )}
          </ul>
        </div>
      );
    };
    
    export default ProfilePage;