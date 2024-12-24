import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthorizationPage from './pages/AuthorizationPage';
import Navbar from './components/Navbar';
import './App.css';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  return (
      <div className="app">
        {isAuthenticated && location.pathname !== '/authorization' && <Navbar setIsAuthenticated={setIsAuthenticated} />} 
        <Routes>
          <Route path="/" element={<AuthorizationPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
  );
}

export default function AppWrapper() {
  return (

      <App />

  );
}