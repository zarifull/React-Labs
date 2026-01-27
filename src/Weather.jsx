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
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getWetherData();
        }
    };
  return (
    <div className="container">
    <div className="weather-container">
         <Link to="/" style={{ marginBottom: '20px', display: 'block',color:'#6c5ce7', fontWeight:'bold'}}>
          ← Back to Home
      </Link>
    <div style={{ textAlign: 'left', padding: '20px' }}  >
         
      </div>
      <div  style={{textAlign : "center", marginTop:"0"}}>
        <h2>
            Weather App
        </h2> 
        <input type="text" 
        placeholder='enter city ....'
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        className="weather-input"
        onKeyDown={handleKeyDown}
        />
        <button onClick={getWetherData} className="weather-button">SEARCH</button>
        {weather && (
                        <div className="weather-display" style={{ marginTop: "20px" }}>
                            <h3>{weather.name}, {weather.sys.country}</h3>
                            
                            <img 
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description} 
                                style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))' }}
                            />
                            
                            <h1>{Math.round(weather.main.temp)} °C</h1>
                            <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
                        </div>
                    )}
    </div>
    </div>
    </div>
  )
}

export default Weather
