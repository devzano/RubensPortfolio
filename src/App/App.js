import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicSpaceBackground from './DynamicSpaceBackground';
import UFO from './UFO';
import Navbar from '../Navbar/Navbar';
import Portfolio from '../Portfolio/Portfolio';
import WatchlistrWeb from '../Projects/Watchlistr-Web/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm/RecipeRealm';
import WatchlistrMobile from '../Projects/Watchlistr-Mobile/Watchlistr(Mobile)';
import EchoExpense from '../Projects/EchoExpense/EchoExpense';
import OtakuHive from '../Projects/OtakuHive/OtakuHive';
import SunshineKeyWestChallenge from '../Projects/SunshineKeyWestChallenge/SunshineKeyWestChallenge';
import StarshipPixelscape from '../Projects/StarshipPixelscape/StarshipPixelscape';
import AutoArchive from '../Projects/AutoArchive/AutoArchive';
import Steda from '../Projects/Steda/Steda';
import ManzanosPopShop from '../Projects/ManzanosPopShop/ManzanosPopShop';
import Logiqo from '../Projects/Logiqo/Logiqo';
import Projects from '../Projects/Projects';
import ErrorPage from './ErrorPage';
import './App.css';

const App = () => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <Router>
      <Navbar onTogglePause={togglePause} />
      <div className="App" style={{marginTop: 30}}>
        <DynamicSpaceBackground isPaused={isPaused} />
        <UFO />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/watchlistr-web" element={<WatchlistrWeb />} />
          <Route path="/reciperealm/*" element={<RecipeRealm />} />
          <Route path="/watchlistr-mobile/*" element={<WatchlistrMobile />} />
          <Route path="/echoexpense/*" element={<EchoExpense />} />
          <Route path="/otakuhive/*" element={<OtakuHive />} />
          <Route path='/sunshinekeywestchallenge/*' element={<SunshineKeyWestChallenge />} />
          <Route path='/starship-pixelscape/*' element={<StarshipPixelscape />} />
          <Route path="/autoarchive/*" element={<AutoArchive />} />
          <Route path="/steda/*" element={<Steda />} />
          <Route path="/manzanos-popshop/*" element={<ManzanosPopShop />} />
          <Route path="/logiqo/*" element={<Logiqo />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;