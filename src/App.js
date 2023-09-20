import React from 'react';
import Portfolio from './Portfolio';
import DynamicBackground from './DynamicBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      <DynamicBackground/>
      <Portfolio/>
    </div>
  );
}

export default App;