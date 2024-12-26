import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";



const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zipCode, setZipCode] = useState('');

    const fetchWeather = async (zip) => {
        setLoading(true);
        setError(null);
      try {
        const response = await axios.get(`https://api.tomorrow.io/v4/weather/realtime`, {
            params: {
                location: zip,
                units: "imperial",
                apikey: import.meta.env.VITE_WEATHER_KEY,
            },
            headers: {
                Accept: "application/json",
            },
        });
        console.log('Weather response:', response.data)
        setWeather(response.data);
      } catch (err) {
        setError(err?.message || "An unexpected error has occured.");
      } finally {
        setLoading(false);
      }
    };

    const handleFetchWeather = () => {
        if (zipCode) {
            fetchWeather(zipCode);
        } else {
            setError('Please enter a valid zip code.')
        }
    };

  return (
    <>
    <div className="weather-card">
        <h2>Weather</h2>
        <input 
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
        />
        <button onClick={handleFetchWeather}>Get Weather</button>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weather && (
            <div>
                <p>Temerature: {weather.data.values.temperature} F</p>
                <p>Precipation Probability: {weather.data.values.precipitationProbability}%</p>
            </div>
        )}
    </div>
    </>
  );
};

export default Weather;
