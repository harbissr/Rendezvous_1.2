import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";



const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.tomorrow.io/v4/weather/realtime`, {
            params: {
                location: "38.785809, -77.187248",
                units: "imperial",
                apikey: import.meta.env.VITE_WEATHER_KEY,
            },
            headers: {
                Accept: "application/json",
            },
        });
        setWeather(response.data);
      } catch (err) {
        setError(err?.message || "An unexpected error has occured.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  const temperature = weather?.data?.values?.temperature;
  const precipitationProbability = weather?.data?.values?.precipitationProbability;

  return (
    <>
    <div className="weather-card">
        <h2>Weather</h2>
        {temperature !== undefined && (
            <p>Temperature: {temperature} F</p>
        )}
        {precipitationProbability !== undefined && (
            <p>Precipitation Probability: {precipitationProbability}%</p>
        )}
    </div>
    </>
  );
};

export default Weather;
