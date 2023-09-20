import React, {useState, useEffect} from 'react';

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
    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/5fAq7d4d", "_blank");
  }

  return (
    <div className="centered-content">
      <a href="https://github.com/devzano/Watchlistr-iOS" target="_blank" rel="noopener noreferrer" className="link-font">Watchlistr (iOS)</a>
      <br/>
      <button onClick={handleBetaButtonClick} className="beta-button">Beta Testing</button>
      <div className="project-image-container">
        <table className="rounded-images-table">
          <tr>
            {[0, 1, 2, 3].map(i => (
              <td align="center" key={i}>
                <img src={WatchlistrScreenshots[i + currentSet * 4]} alt={`Watchlistr View ${i + currentSet * 4}`} width="300"/>
              </td>
            ))}
          </tr>
        </table>
      </div>
      <style jsx>{`
        .project-image-container {
          transition: opacity 1s;
        }
      `}</style>
    </div>
  );
};

export default WatchlistriOS;