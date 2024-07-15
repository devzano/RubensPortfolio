import React, { useState, useEffect } from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import '../../Projects/MailForm/BetaSignupForm.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';

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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    if (WatchlistrScreenshots.length > 0) {
      const maxSets = window.innerWidth <= 768 ? WatchlistrScreenshots.length / 2 : WatchlistrScreenshots.length / 4;
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [WatchlistrScreenshots.length]);

  const handleAppStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/watchlistr/id6459355223", "_blank");
  };

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/5fAq7d4d", "_blank");
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/'},
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: firebaseLogo, alt: 'Firebase Logo', link: 'https://firebase.google.com/' },
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => setIsTermsModalOpen(true) },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => setIsPrivacyModalOpen(true) }
  ];

  const closeModal = () => {
    setIsTermsModalOpen(false);
    setIsPrivacyModalOpen(false);
  };

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/watchlistr/id6459355223" target="_blank" rel="noopener noreferrer" className="section-title">Watchlistr</a>
      </h1>
      <div className="centered-content">
        <div className="flex justify-center space-x-4">
          <button onClick={handleAppStoreButtonClick} className="app-button">App Store</button>
          &nbsp;
          <button onClick={handleBetaButtonClick} className="app-button">Beta</button>
        </div>
        <p className="swipe-prompt">for the full experience of Watchlistr tap beta!</p>
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
                    {logo.link ? (
                      <a href={logo.link} target="_blank" rel="noopener noreferrer">
                        <img src={logo.src} alt={logo.alt} className="logo" />
                      </a>
                    ) : (
                      <img src={logo.src} alt={logo.alt} className="logo" onClick={logo.onClick} style={{ cursor: 'pointer' }} />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTermsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe src="https://doc-hosting.flycricket.io/watchlistr-terms-of-use/3a2dbd85-0829-4f61-9560-6518d02bd07b/terms" title="Terms of Use"></iframe>
          </div>
        </div>
      )}
      {isPrivacyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe src="https://doc-hosting.flycricket.io/watchlistr-privacy-policy/1926eb16-dda6-4138-8714-256aa79e5472/privacy" title="Privacy Policy"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistriOS;
