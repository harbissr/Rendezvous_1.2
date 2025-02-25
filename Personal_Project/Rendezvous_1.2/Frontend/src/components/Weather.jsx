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
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                zip: zip,
                units: "imperial",
                appid: import.meta.env.VITE_OPEN_WEATHER_MAP,
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

    // const fetchCoordinates = async (zip) => {
    //   try{
    //     const response = await axios.get(`http://api.openweathermap.org/geo/1.0/zip`, {
    //       params: {
    //         zip: zip,
    //         country_code: country_code,
    //         appid: import.meta.env.OPEN_WEATHER_MAP,
    //       },
    //     });
    //     const {lat, lon} = response.data;
    //     fetchWeather(lat, lon);
    //   } catch (err) {
    //     setError("Failed to fetch coordinates.");
    //     setLoading(false)
    //   }
    // };

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
                <p>Temerature: {weather.main.temp} F</p>
                <p>Precipation Probability: {weather.weather[0].description}</p>
            </div>
        )}
    </div>
    </>
  );
};

export default Weather;
