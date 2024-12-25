import React from "react";
import axios from "axios";

const DeleteButton = ({ eventId, onDelete }) => {
    const handleDelete = async () => {
        try {
        await axios.delete(`http://127.0.0.1:8000/api/v1/events/${eventId}/`, {
            headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            },
        });
        onDelete(eventId);
        } catch (error) {
        console.error(error);
        }
    };
    
    return (
        <button onClick={handleDelete}>Delete</button>
    );
}
export default DeleteButton;