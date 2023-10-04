import React, {useState} from 'react';
import WatchlistrWeb from '../Projects/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm';
import WatchlistriOS from '../Projects/Watchlistr(iOS)';
import '../Projects/Projects.css';
import '../Portfolio/Portfolio.css';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const slides = [<WatchlistrWeb/>, <RecipeRealm/>, <WatchlistriOS/>];

  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleEnd = (clientX) => {
    if (!isDragging) return;
    setIsDragging(false);
    const difference = startX - clientX;
    if (difference > 50) {
      nextSlide();
    } else if (difference < -50) {
      prevSlide();
    }
  };

  const nextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

  const prevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);

  const slideTransform = `translateX(-${currentSlide * 100}%)`;

  return (
    <div
      className="coding-background"
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onMouseLeave={() => isDragging && setIsDragging(false)}
    >
      <h2 className="section-title">Projects</h2>
      <div className="centered-content">
      <div className="slider">
        <p className="swipe-prompt">swipe to see more projects</p>
        <div className="project">
        <div className="sections-container">
        <div className="section">
        <div className="slide-container" style={{transform: slideTransform}}>
          {slides.map((slide, index) => (
            <div key={index} className={index === currentSlide ? "current-slide" : "next-slide"}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Projects;