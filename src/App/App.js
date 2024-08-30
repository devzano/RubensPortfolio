import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { isMobile } from 'react-device-detect';
import DynamicSpaceBackground from './DynamicSpaceBackground';
import UFO from './UFO';
import Navbar from '../Navbar/Navbar';
import Portfolio from '../Portfolio/Portfolio';
import WatchlistrWeb from '../Projects/Watchlistr-Web/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm/RecipeRealm';
import WatchlistriOS from '../Projects/Watchlistr-iOS/Watchlistr(iOS)';
import EchoExpense from '../Projects/EchoExpense/EchoExpense';
import Projects from '../Projects/Projects';
import ErrorPage from './ErrorPage';
import './App.css';
import '../Navbar/Navbar.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <DynamicSpaceBackground />
        <UFO />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/watchlistr-web" element={<WatchlistrWeb />} />
          <Route path="/reciperealm/*" element={<RecipeRealm />} />
          <Route path="/watchlistr-ios/*" element={<WatchlistriOS />} />
          <Route path="/echoexpense/*" element={<EchoExpense />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;