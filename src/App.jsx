import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather'; 
import Lesson1 from './pages/Lesson1';
import TaskManager from './pages/TaskManager';
import CurrencyConverter from './pages/CurrencyConverter';
import MovieSearch from './pages/MovieSearch';
import ECommerceLab from './pages/ECommerceLab';
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
        <Route path='/market-plays' element={<ECommerceLab />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;