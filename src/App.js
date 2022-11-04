import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './index.css';

import MainCalendar from './components/MainCalendar';
import Actions from './components/Actions';


function App() {

  useEffect(() => {
    document.title = 'MERN Calendar'
  }, []);


  return (
    <div className="w-full p-4 
      flex flex-col md:flex-row 
      grid grid-cols-12">
      {/* <Routes>
        <Route path="/" element={<MainCalendar/>} />
      </Routes> */}
      {/* <MainCalendar/> */}
      <MainCalendar/>
      <Actions/>
    </div>
  );
};

export default App;
