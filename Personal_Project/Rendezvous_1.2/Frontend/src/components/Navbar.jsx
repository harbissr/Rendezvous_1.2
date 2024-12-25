import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({setIsAuthenticated}) => {

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.post("http://127.0.0.1:8000/api/v1/users/logout/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`, // Set the token in the request header
        },
      }
      );
      if (response.status === 204 || response.status === 200){
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Remove the token from localStorage
        navigate("/");
      }else{
        console.error("Login failure:", error);
      }
    }catch (error){
      console.error("Login failure:", error);
    }
  };

  return (
    <nav className="navbar">
      <h1>Rendezvous</h1>
      <div className="navbar-container">
        <Link to="/homepage">Home</Link>
        <span className='separator'> | </span>

        <Link to="/profile">Profile</Link>
        <span className='separator'> | </span>

        <Link to="/events">Events</Link> 
        <span className='separator'> | </span>

        <Link to="/friends">Friends</Link>
        <span className='separator'> | </span>

        <Link to="/messages">Messages</Link>
        <span className='separator'> | </span>

        <Link to="/settings">Settings</Link>
        <span className='separator'> | </span>

        <Link to="/help">Help</Link>
        <span className='separator'> | </span>

        <Link to="/about">About</Link>
        <span className='separator'> | </span>

        <Link to="/contact">Contact</Link>
        <span className='separator'> | </span>

        <button onClick={handleLogout}>
            Logout
        </button>
      </div>
    </nav>
  );
};

  

export default Navbar;