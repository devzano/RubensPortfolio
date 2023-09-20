import React from 'react';

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
  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/5fAq7d4d", "_blank");
  }

  return (
    <div className="centered-content">
      <a href="https://github.com/devzano/Watchlistr-iOS" target="_blank" rel="noopener noreferrer" className="link-font">Watchlistr iOS</a>
      <br/>
      <button onClick={handleBetaButtonClick} className="beta-button">Beta Testing</button>
      <div className="project-image-container">
        <table className="rounded-images-table">
                <tr>
                  <td align="center">
                    <img src={WatchlistrScreenshots[0]} alt="Watchlistr Login View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[1]} alt="Watchlistr Movie Tab" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[2]} alt="Watchlistr TV Show Tab" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[3]} alt="Watchlistr Profile Tab" width="300"/>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <img src={WatchlistrScreenshots[4]} alt="Watchlistr Blank Movie Search" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[5]} alt="Watchlistr Movie Search Results" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[6]} alt="Watchlistr Movie Detail View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[7]} alt="Watchlistr Movie Watchlist" width="300"/>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <img src={WatchlistrScreenshots[8]} alt="Watchlistr Blank TV Show Search" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[9]} alt="Watchlistr TV Show Search Results" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[10]} alt="Watchlistr TV Show Detail View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={WatchlistrScreenshots[11]} alt="Watchlistr TV Show Watchlist" width="300"/>
                  </td>
                </tr>
              </table>
      </div>
    </div>
  );
};


export default WatchlistriOS;