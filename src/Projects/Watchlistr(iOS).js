import React, {useState, useEffect} from 'react';
import '../Portfolio/Portfolio.css';
import '../Projects/Projects.css';

const WatchlistriOS = () => {
  const WatchlistrScreenshots = [
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(LoginView).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(MovieTab).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(TVShowTab).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(ProfileTab).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(BlankMovieSearch).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(MovieSearchResults).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(MovieDetails).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(MovieWatchlist).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(BlankTVShowSearch).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(TVShowSearchResults).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(TVShowDetails).png",
    "https://github.com/devzano/Watchlistr-iOS/raw/main/Screenshots/Watchlistr%20(TVShowWatchlist).png"
  ];

  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const maxSets = window.innerWidth <= 768 ? WatchlistrScreenshots.length / 2 : WatchlistrScreenshots.length / 4;
    const interval = setInterval(() => {
      setCurrentSet(prevSet => (prevSet + 1) % maxSets);
    }, 4000);
    return () => clearInterval(interval);
  }, [WatchlistrScreenshots.length]);

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/5fAq7d4d", "_blank");
  }

  const numberOfImages = window.innerWidth <= 768 ? 2 : 4;

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://github.com/devzano/Watchlistr-iOS" target="_blank" rel="noopener noreferrer" className="section-title link-font">Watchlistr</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleBetaButtonClick}
          className="beta-button">Beta Testing</button>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
              <table className="rounded-images-table">
                <tr> {
                  Array.from({length: numberOfImages}).map((_, i) => (
                    <td align="center" key={i}>
                      <img src={WatchlistrScreenshots[i + currentSet * numberOfImages]}
                           alt={`Watchlistr View ${i + currentSet * numberOfImages}`}
                           width="300"/>
                    </td>
                  ))
                } </tr>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistriOS;