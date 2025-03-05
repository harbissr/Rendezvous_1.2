import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';
import "../components/ProfilePage.css";


const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get('http://127.0.0.1:8000/api/v1/user/', {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setUser(userResponse.data);
            } catch (err) {
                setError("Failed to fetch user events. Please try again.");
            }
        };

    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const eventsResponse = await axios.get('https://127.0.0.1:8000/api/v1/events/', {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setEvents(eventsResponse.data);
      } catch (err) {
        setError("Failed to fetch user events.")
      }
    };

    fetchUserData();
    fetchUserEvents();
    }, []);

    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter((event) => event.id !== eventId));
    }

    const handleEditEvent = (eventId, updatedEvent) => {
        setEvents(events.map(event => event.Id === eventId ? { ...events, ...updatedEvent } : event));
    }

    return (
      <>
      <div className="profile-page">
          <div className="profile-header">
              <img src={user.profile_picture} alt="Profile" className="profile-picture" />
              <h1>{user.username}</h1>
              <p>{user.email}</p>
              <p>{user.bio}</p>
          </div>
          <div className="profile-content">
              <h2>Your Events</h2>
              {error && <p className="error">{error}</p>}
              <ul>
                  {events.length > 0 ? (
                      events.map((event) => (
                          <li key={error.id}>
                              {event.name} - {new Date(event.start_time).toLocaleDateString()} to {new Date(event.end_time).toLocaleDateString()}
                              <EditButton eventId={event.id} onEdit={handleEditEvent} />
                              <DeleteButton eventId={event.id} onDelete={handleDeleteEvent} />
                          </li>
                      ))
                  ) : (
                      <li>No events created yet.</li>
                  )}
              </ul>
          </div>
      </div>
      </>
      );
    };
    
    export default ProfilePage;