import React, {useState, useEffect} from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png'
import reactLogo from '../../Projects/CodingLogos/react.png'
import vsLogo from '../../Projects/CodingLogos/visualstudio.png'
import jsLogo from '../../Projects/CodingLogos/javascript.png'
import mysqlLogo from '../../Projects/CodingLogos/mysql.png';
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
    }, 4000);
    return() => clearInterval(interval);
  }, [WatchlistrWebScreens.length]);

  const builtWithLogos = [
    vsLogo,
    jsLogo,
    reactLogo,
    mysqlLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <div className="centered-content">
      <h1 className="title">
          <a href="https://watchlistr-web.vercel.app" target="_blank" rel="noopener noreferrer" className="section-title">Watchlistr</a>
      </h1>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
                <img src={WatchlistrWebScreens[watchlistrIndex]} alt={`Project ${watchlistrIndex + 1}`} className="project-image" style={{width: '100%', maxHeight: '500px'}}/>
              </div>
              <p className="project-description">
              Watchlistr represents the beginning of my exciting journey into the world of project development. It's a dynamic website that makes it incredibly easy for users to create personal accounts and curate their own movie and TV show watchlists. You can explore upcoming releases, popular picks, and top-rated media. Watchlistr's primary goal is to empower you to collect and save all those must-see titles for future viewing pleasure.
              </p>
              <div className="logo-container">
                {builtWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === builtWithLogos.length - 1 ? (
                      <a href="https://github.com/devzano/Watchlistr-Web" target="_blank" rel="noopener noreferrer">
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