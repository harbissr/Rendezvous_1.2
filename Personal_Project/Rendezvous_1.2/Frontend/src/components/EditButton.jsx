import React, {useState} from "react";
import axios from "axios";

const EditButton = ({ eventId, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [eventData, setEventData] = useState({ name: "", start: ""});

    const handleEdit = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/v1/events/${eventId}/`, eventData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    "Content-Type": 'application/json',
                },
            });
            onEdit(eventId, eventData);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
            {isEditing ? (
                <div>
                    <input 
                        type="text"
                        placeholder="Event Name"
                        value={eventData.name}
                        onChange={(e) => setEventData({...eventData, name: e.target.value})}
                    />
                    <input
                        type="datetime-local"
                        value={eventData.start}
                        onChange={(e) => setEventData({...eventData, start: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Currency"
                        value={eventData.currency}
                        onChange={(e) => setEventData({ ...eventData, currency: e.target.value})}
                    />
                    <input 
                        type="email"
                        placeholder="Creator Email"
                        value={eventData.creator_email}
                        onChange={(e) => setEventData({ ...eventData, creator_email: e.target.value })}
                    />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <button onClick={setIsEditing(true)}>Edit</button>
            )}
        </>
    );
};

export default EditButton;