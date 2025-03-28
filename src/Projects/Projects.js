import React, { useState, useRef } from 'react';
import WatchlistrWeb from '../Projects/Watchlistr-Web/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm/RecipeRealm';
import WatchlistrMobile from '../Projects/Watchlistr-Mobile/Watchlistr(Mobile)';
import EchoExpense from '../Projects/EchoExpense/EchoExpense';
import OtakuHive from './OtakuHive/OtakuHive';
import SunshineKeyWestChallenge from './SunshineKeyWestChallenge/SunshineKeyWestChallenge'
import StarshipPixelscape from './StarshipPixelscape/StarshipPixelscape';
import '../Projects/Projects.css';
import '../Portfolio/Portfolio.css';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const slides = [
  <WatchlistrWeb />,
  <RecipeRealm />,
  <WatchlistrMobile />,
  <EchoExpense />,
  <OtakuHive />,
  <SunshineKeyWestChallenge />,
  <StarshipPixelscape />];
  const sliderRef = useRef(null);

  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsDragging(true);
    setOffsetX(0);
  };

  const handleMove = (clientX) => {
    if (isDragging) {
      const difference = startX - clientX;
      setOffsetX(difference);
    }
  };

  const handleEnd = () => {
    if (isDragging) {
      if (offsetX > 50) {
        nextSlide();
      } else if (offsetX < -50) {
        prevSlide();
      }
      setIsDragging(false);
      setOffsetX(0);
    }
  };

  const handleWheel = (event) => {
    if (event.deltaX > 50) {
      nextSlide();
    } else if (event.deltaX < -50) {
      prevSlide();
    }
  };

  const nextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

  const prevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);

  const slideTransform = `translateX(calc(-${currentSlide * 100}% - ${offsetX}px))`;

  return (
    <div
      className="coding-background"
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onWheel={handleWheel}
      ref={sliderRef}
    >
      <h2 className="section-title">Projects</h2>
      <div className="slider">
        <p className="swipe-prompt">swipe to see more projects</p>
        <div className="slide-container" style={{ transform: slideTransform }}>
          {slides.map((slide, index) => (
            <div key={index} className={index === currentSlide ? 'current-slide' : 'next-slide'}>
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;