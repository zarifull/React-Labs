import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Weather from './Weather'; 
import Lesson1 from './Lesson1';
import TaskManager from './taskManager';
import CurrencyConverter from './CurrencyConverter';
import MovieSearch from './MovieSearch';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-dashboard" element={<Lesson1 />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/weather" element={<Weather />} />
        <Route path='/currency' element={<CurrencyConverter />}/>
        <Route path='/movies' element={<MovieSearch />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;