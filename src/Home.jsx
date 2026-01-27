import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const badgeStyle = {
        fontSize: '0.8rem',
        backgroundColor: '#e1e8ed',
        padding: '2px 8px',
        borderRadius: '10px',
        marginLeft: '10px',
        color: '#34495e',
        fontWeight: 'bold'
    };

    return (
      <div style={{
          backgroundColor: "#f4f7f6", 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'sans-serif'
      }}>
          <div className="container" style={{
              maxWidth: '800px', 
              padding: '40px', 
              backgroundColor: 'white', 
              borderRadius: '15px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
          }}>
              <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                  Welcome to my Learning Process
              </h1>
              <p style={{ lineHeight: '1.6', color: '#555', fontSize: '1.1rem' }}>
                  This is a collection of my React projects where I practice complex logic, 
                  API integrations, and performance optimization.
              </p>
              
              <div className="links" style={{ textAlign: 'left', marginTop: '30px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '15px' }}>
                        <Link to='/team-dashboard' style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
                            🚀 Team Dashboard
                        </Link>
                        <span style={badgeStyle}>useMemo, useEffect, localStorage, Filter/Sort logic</span>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <Link to='/weather' style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
                            ☁️ Weather App
                        </Link>
                        <span style={badgeStyle}>Async/Await, Fetch API, Conditional Rendering</span>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <Link to='/task-manager' style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
                            📝 Task Manager
                        </Link>
                        <span style={badgeStyle}>State Management, CRUD operations</span>
                    </li>
                </ul>
              </div>
          </div>
      </div>
    )
  }

export default Home;