import React, { useState, useEffect } from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import '../../Projects/MailForm/BetaSignupForm.css';
import BetaSignupForm from '../MailForm/BetaSignupForm';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';

import LoginView from '../Watchlistr-iOS/Screenshots/Watchlistr(LoginView).png';
import SignupView from '../Watchlistr-iOS/Screenshots/Watchlistr(SignupView).png';
import ProfileTabView from '../Watchlistr-iOS/Screenshots/Watchlistr(ProfileTabView).png';
import ProfileTabViewTextColorsView from '../Watchlistr-iOS/Screenshots/Watchlistr(ProfileTabViewTextColorsView).png';
import MovieTabView from '../Watchlistr-iOS/Screenshots/Watchlistr(MovieTabView).png';
import BlankMovieSearchView from '../Watchlistr-iOS/Screenshots/Watchlistr(BlankMovieSearchView).png';
import MovieSearchResultsView from '../Watchlistr-iOS/Screenshots/Watchlistr(MovieSearchResultsView).png';
import MovieDetailsView from '../Watchlistr-iOS/Screenshots/Watchlistr(MovieDetailsView).png';
import TVShowTabView from '../Watchlistr-iOS/Screenshots/Watchlistr(TVShowTabView).png';
import BlankTVShowSearchView from '../Watchlistr-iOS/Screenshots/Watchlistr(BlankTVShowSearchView).png';
import TVShowSearchResultsView from '../Watchlistr-iOS/Screenshots/Watchlistr(TVShowSearchResultsView).png';
import TVShowDetailsView from '../Watchlistr-iOS/Screenshots/Watchlistr(TVShowDetailsView).png';
import MovieWatchlistContextMenuView from '../Watchlistr-iOS/Screenshots/Watchlistr(MovieWatchlistContextMenuView).png';
import MovieWatchlistView from '../Watchlistr-iOS/Screenshots/Watchlistr(MovieWatchlistView).png';
import TVShowWatchlistContextMenuView from '../Watchlistr-iOS/Screenshots/Watchlistr(TVShowWatchlistContextMenuView).png';
import TVShowWatchlistView from '../Watchlistr-iOS/Screenshots/Watchlistr(TVShowWatchlistView).png';

const WatchlistriOS = () => {
  const WatchlistrScreenshots = [
    LoginView,
    SignupView,
    ProfileTabView,
    ProfileTabViewTextColorsView,
    MovieTabView,
    BlankMovieSearchView,
    MovieSearchResultsView,
    MovieDetailsView,
    TVShowTabView,
    BlankTVShowSearchView,
    TVShowSearchResultsView,
    TVShowDetailsView,
    MovieWatchlistView,
    MovieWatchlistContextMenuView,
    TVShowWatchlistView,
    TVShowWatchlistContextMenuView
  ];

  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    if (WatchlistrScreenshots.length > 0) {
      const maxSets = window.innerWidth <= 768 ? WatchlistrScreenshots.length / 2 : WatchlistrScreenshots.length / 4;
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [WatchlistrScreenshots.length]);

  const [showBetaForm, setShowBetaForm] = useState(false);

  const handleAppStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/watchlistr/id6459355223", "_blank");
  };

  const toggleBetaForm = () => {
    setShowBetaForm(!showBetaForm);
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    xcodeLogo,
    switftuiLogo,
    firebaseLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/watchlistr/id6459355223" target="_blank" rel="noopener noreferrer" className="section-title">Watchlistr</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleAppStoreButtonClick} className="app-button">Available on the App Store</button>
        <p className="swipe-prompt">For a full experience of Watchlistr sign up below to test!</p>
        <button onClick={toggleBetaForm} className="app-button">Beta Signup</button>
        {showBetaForm && <BetaSignupForm />}
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
                <table className="rounded-images-table centered-images-table">
                  <tbody>
                    <tr>
                      {Array.from({ length: numberOfImages }).map((_, i) => (
                        <td align="center" key={i}>
                          <img src={WatchlistrScreenshots[i + currentSet * numberOfImages]}
                            alt={`Watchlistr View ${i + currentSet * numberOfImages}`}
                            width="300" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">Watchlistr is designed from my initial website with a different implantation, with the help of Apple & Google, I am able to let users create an account to keep track of their favorite movies and TV shows when added to their Watchlist. With an intuitive UI and easy-to-navigate tabs, users can effortlessly browse through movies, TV shows, and even see where they can watch them based on available providers.</p>
              <div className="logo-container">
                {BuiltWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === BuiltWithLogos.length - 1 ? (
                      <a href="https://github.com/devzano" target="_blank" rel="noopener noreferrer">
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

export default WatchlistriOS;