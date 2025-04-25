import React, { useState, useRef, useEffect } from 'react';
import WatchlistrWeb from '../Projects/Watchlistr-Web/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm/RecipeRealm';
import WatchlistrMobile from '../Projects/Watchlistr-Mobile/Watchlistr(Mobile)';
import EchoExpense from '../Projects/EchoExpense/EchoExpense';
import OtakuHive from './OtakuHive/OtakuHive';
import SunshineKeyWestChallenge from './SunshineKeyWestChallenge/SunshineKeyWestChallenge';
import StarshipPixelscape from './StarshipPixelscape/StarshipPixelscape';
import AutoArchive from './AutoArchive/AutoArchive';
import '../Projects/Projects.css';
import '../Portfolio/Portfolio.css';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerHeight, setContainerHeight] = useState('auto');
  const slideRef = useRef(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slides = [
    <WatchlistrWeb showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <RecipeRealm showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <WatchlistrMobile showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <EchoExpense showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <OtakuHive showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <SunshineKeyWestChallenge showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <StarshipPixelscape showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />,
    <AutoArchive showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />
  ];

  useEffect(() => {
    if (slideRef.current) {
      setContainerHeight(`${slideRef.current.offsetHeight}px`);
    }
  }, [currentSlide]);

  return (
    <div className="coding-background">
      <h2 className="section-title">All Projects</h2>
      <div className="slider" style={{ height: containerHeight, transition: 'height 0.5s ease' }}>
        <div className="slide-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={index === currentSlide ? slideRef : null}
              className={`fade-slide ${index === currentSlide ? 'active' : ''}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;