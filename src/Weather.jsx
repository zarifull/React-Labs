import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Weather = () => {
    const [city,setCity]= useState("");
    const [weather,setWeather]= useState(null);

    const getWetherData = async () => {
        const apiKey = "a009a8468d93c12375a0bbbc29423fb5";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setWeather(data);
                
            }else{
                alert("City not found");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
  return (
    <>
    <div style={{ textAlign: 'left', padding: '20px' }}>
          <Link to="/" style={{ 
              textDecoration: 'none', 
              color: '#3498db', 
              fontSize: '1rem',
              fontWeight: 'bold' 
          }}>
              ← Back to Learning Process
          </Link>
      </div>
      <div  style={{textAlign : "center", marginTop:"50px"}}>
        <h2>
            Weather App
        </h2> 
        <input type="text" 
        placeholder='enter city ....'
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        />
        <button onClick={getWetherData}>SEARCH</button>
        {weather && (
            <div className="" style={{marginTop: "20px"}}>
                <h3>{weather.name}, {weather.sys.country}</h3>
                <h1>{Math.round(weather.main.temp)} ⁰C</h1>
                <p>{weather.weather[0].description}</p>
            </div>
        )}
    </div>
    </>
  )
}

export default Weather
