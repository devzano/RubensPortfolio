import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import DynamicBackground from './DynamicBackground';
import Navbar from '../Navbar/Navbar';
import Portfolio from '../Portfolio/Portfolio';
import WatchlistrWeb from '../Projects/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm';
import WatchlistriOS from '../Projects/Watchlistr(iOS)';
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
          <DynamicBackground/>)
        }
        <Routes>
          <Route path="/"
            element={<Portfolio/>}/>
          <Route path="/watchlistr-web"
            element={<WatchlistrWeb/>}/>
          <Route path="/reciperealm"
            element={<RecipeRealm/>}/>
          <Route path="/watchlistr-ios"
            element={<WatchlistriOS/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;