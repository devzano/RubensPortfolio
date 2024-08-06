import React, { useState, useEffect } from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import reactLogo from '../../Projects/CodingLogos/react.png';
import viteLogo from '../../Projects/CodingLogos/vite.png';
import vsLogo from '../../Projects/CodingLogos/visualstudio.png';
import jsLogo from '../../Projects/CodingLogos/javascript.png';

import LoginPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(LoginPage).png';
import SignupPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(SignupPage).png';
import HomePage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(HomePage).png';
import MoviesPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(MoviesPage).png';
import TVShowsPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(TVShowsPage).png';

const WatchlistrWeb = () => {
  const WatchlistrWebScreens = [
    LoginPage,
    SignupPage,
    HomePage,
    MoviesPage,
    TVShowsPage
  ];

  const [watchlistrIndex, setWatchlistrIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistrIndex((prevIndex) => (prevIndex + 1) % WatchlistrWebScreens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [WatchlistrWebScreens.length]);

  const builtWithLogos = [
    vsLogo,
    jsLogo,
    reactLogo,
    viteLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <div className="centered-content">
        <h1 className="title">
          <a href="https://watchlistrweb.vercel.app" target="_blank" rel="noopener noreferrer" className="section-title">Watchlistr</a>
        </h1>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
                <img src={WatchlistrWebScreens[watchlistrIndex]} alt={`Project ${watchlistrIndex + 1}`} className="project-image" style={{ width: '100%', maxHeight: '500px' }} />
              </div>
              <p className="project-description">
                Embarking on my journey into project development, I created Watchlistr as a platform to enhance your entertainment experience. Initially, it was only a website, and I have now seamlessly integrated it with my <a href="https://www.rubenmanzano.com/watchlistr-ios" target="_blank" rel="noopener noreferrer">iOS app</a>, allowing users to enjoy a unified experience. You can easily login or create an account on either platform.
              </p>

              <p className="project-description">
                Watchlistr makes it simple for you to create personal accounts and curate your own Movie and TV Show watchlists. Discover upcoming releases, explore popular picks, and check out top-rated media, all in one place.
              </p>

              <p className="project-description">
                My mission is to empower you to collect and save all those must-see and classic titles for your future viewing pleasure. Join today and never miss out on the media you love!
              </p>
              <div className="logo-container">
                {builtWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === builtWithLogos.length - 1 ? (
                      <a href="https://github.com/devzano/" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt={`Logo ${index + 1}`} className="logo" />
                      </a>
                    ) : (
                      <img src={logo} alt={`Logo ${index + 1}`} className="logo" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistrWeb;