import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import expoLogo from '../CodingLogos/expodevinv.png'
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';

import LoginView from './Screenshots/Watchlistr(LoginView).png';
import SignupView from './Screenshots/Watchlistr(SignupView).png';
import ProfileTabView from './Screenshots/Watchlistr(ProfileTabView).png';
import ProfileTabViewTextColorsView from './Screenshots/Watchlistr(ProfileTabViewTextColorsView).png';
import MovieTabView from './Screenshots/Watchlistr(MovieTabView).png';
import BlankMovieSearchView from './Screenshots/Watchlistr(BlankMovieSearchView).png';
import MovieSearchResultsView from './Screenshots/Watchlistr(MovieSearchResultsView).png';
import MovieDetailsView from './Screenshots/Watchlistr(MovieDetailsView).png';
import TVShowTabView from './Screenshots/Watchlistr(TVShowTabView).png';
import BlankTVShowSearchView from './Screenshots/Watchlistr(BlankTVShowSearchView).png';
import TVShowSearchResultsView from './Screenshots/Watchlistr(TVShowSearchResultsView).png';
import TVShowDetailsView from './Screenshots/Watchlistr(TVShowDetailsView).png';
import MovieWatchlistContextMenuView from './Screenshots/Watchlistr(MovieWatchlistContextMenuView).png';
import MovieWatchlistView from './Screenshots/Watchlistr(MovieWatchlistView).png';
import TVShowWatchlistContextMenuView from './Screenshots/Watchlistr(TVShowWatchlistContextMenuView).png';
import TVShowWatchlistView from './Screenshots/Watchlistr(TVShowWatchlistView).png';

import Privacy from './Privacy';
import Terms from './Terms';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content" style={{ backgroundColor: '#151515', color: '#fff', padding: '20px', borderRadius: '10px' }}>
        <span className="close" onClick={onClose} style={{ cursor: 'pointer', fontSize: '24px', color: '#fff' }}>&times;</span>
        {title === "Privacy Policy" ? <Privacy /> : title === "Terms of Use" ? <Terms /> : children}
      </div>
    </div>
  );
};

const WatchlistrMobile = () => {
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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (WatchlistrScreenshots.length > 0) {
      const maxSets = Math.ceil(WatchlistrScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [WatchlistrScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/watchlistr-mobile/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/watchlistr-mobile/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/watchlistr/id6459355223", "_blank");
  };

  const handleTestFlightButtonClick = () => {
    window.open("https://testflight.apple.com/join/5fAq7d4d", "_blank");
  };

  // const handlePlayStoreButtonClick = () => {
  //   window.open("https://apps.apple.com/us/app/watchlistr/id6459355223", "_blank");
  // };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appName: 'Watchlistr',
          firstName: feedback.firstName,
          lastName: feedback.lastName,
          email: feedback.email,
          message: feedback.message
        })
      });

      if (response.ok) {
        alert('Feedback sent successfully!');
        setIsFeedbackModalOpen(false);
        setFeedback({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        alert('Failed to send feedback. Please try again later.');
      }
    } catch (error) {
      alert('Error sending feedback. Please try again later.');
    }
  };

  const handleCloseModal = (modalSetter) => {
    modalSetter(false);
    if (location.pathname === '/watchlistr-mobile/privacy' || location.pathname === '/watchlistr-mobile/terms') {
      navigate('/watchlistr-mobile');
    }
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: expoLogo, alt: 'Expo Logo', link: 'https://docs.expo.dev/' },
    { src: firebaseLogo, alt: 'Firebase Logo', link: 'https://firebase.google.com/' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/watchlistr-mobile/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/watchlistr-mobile/privacy') }
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/watchlistr/id6459355223" target="_blank" rel="noopener noreferrer" className="section-title">Watchlistr</a>
      </h1>
      <div className="centered-content">
        <div className="flex justify-center space-x-4">
          <button onClick={handleAppleStoreButtonClick} className="app-button">Apple Store</button>
          &nbsp;
          <button onClick={handleTestFlightButtonClick} className="app-button">TestFlight</button>
          {/* &nbsp;
          <button onClick={handlePlayButtonClick} className="app-button">Play Store</button> */}
          &nbsp;
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
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
                            width="300"/>
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
                      <Link to={logo.link}>
                        <img src={logo.src} alt={logo.alt} className="logo"/>
                      </Link>
                    ) : (
                      <img src={logo.src} alt={logo.alt} className="logo" onClick={logo.onClick} style={{ cursor: 'pointer' }}/>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => handleCloseModal(setIsTermsModalOpen)}
        title="Terms of Use"
      />
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => handleCloseModal(setIsPrivacyModalOpen)}
        title="Privacy Policy"
      />
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        title="Send Feedback"
      >
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <h2 className="modal-title">Send Feedback</h2>
          <label className="form-label">
            First Name:
            <input type="text" value={feedback.firstName} onChange={(e) => setFeedback({ ...feedback, firstName: e.target.value })} required className="form-input"/>
          </label>
          <label className="form-label">
            Last Name:
            <input type="text" value={feedback.lastName} onChange={(e) => setFeedback({ ...feedback, lastName: e.target.value })} required className="form-input"/>
          </label>
          <label className="form-label">
            Email:
            <input type="email" value={feedback.email} onChange={(e) => setFeedback({ ...feedback, email: e.target.value })} required className="form-input"/>
          </label>
          <label className="form-label">
            Message:
            <textarea value={feedback.message} onChange={(e) => setFeedback({ ...feedback, message: e.target.value })} required className="form-input form-textarea"/>
          </label>
          <button type="submit" className="app-button">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default WatchlistrMobile;