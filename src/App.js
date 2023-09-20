import React from 'react';
import { isMobile } from 'react-device-detect';
import Portfolio from './Portfolio';
import DynamicBackground from './DynamicBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      {isMobile ? (
        // Render app background for mobile
        <div className="mobile"></div>
      ) : (
        // Render dynamic background for desktop
        <DynamicBackground />
      )}
      <Portfolio/>
    </div>
  );
}

export default App;