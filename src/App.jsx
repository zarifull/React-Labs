import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Weather from './Weather'; 
import Lesson1 from './Lesson1';
import TaskManager from './taskManager';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-dashboard" element={<Lesson1 />} />
        <Route path="/task-manager" element={<TaskManager />} />

        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;