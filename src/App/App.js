import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import Navbar from '../Navbar/Navbar';
import Portfolio from '../Portfolio/Portfolio';
import Projects from '../Projects/Projects';
import DynamicBackground from './DynamicBackground';
import './App.css';
import '../Navbar/Navbar.css';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        {isMobile ? (
          <div className="mobile"></div>
        ) : (
          <DynamicBackground/>
        )}
        <Routes>
          <Route path="/" element={<Portfolio/>}/>
          <Route path="/projects" element={<Projects/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;