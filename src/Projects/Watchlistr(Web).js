import React, {useState, useEffect} from 'react';
import '../Portfolio/Portfolio.css';

const WatchlistrWeb = () => {
  const WatchlistrWebScreens = [
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/LoginPage.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/SignupPage.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/Upcoming.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/PopularMovies.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/TopRatedMovies.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/PopularTVShows.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/AiringToday.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/TopRatedTVShows.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/Watchlist.png?raw=true",
  ];

  const [watchlistrIndex, setWatchlistrIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistrIndex((prevIndex) => (prevIndex + 1) % WatchlistrWebScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [WatchlistrWebScreens.length]);

  return (
    <div className="centered-content">
      <a href="https://watchlistr-web.vercel.app" target="_blank" rel="noopener noreferrer" className="link-font">Watchlistr</a>
      <div className="project-image-container">
        <img src={WatchlistrWebScreens[watchlistrIndex]} alt={`Project ${watchlistrIndex + 1}`} className="project-image" style={{width: '100%', maxHeight: '500px'}}/>
      </div>
    </div>
  );
};

export default WatchlistrWeb;