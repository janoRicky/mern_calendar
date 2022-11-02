import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

// import Navbar from './components/Navbar';


function App() {

  useEffect(() => {
      document.title = 'MERN Calendar'
  }, []);


  return (
    <div className="wrapper">
      <Navbar />
      <div class="main">
        <div class="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
