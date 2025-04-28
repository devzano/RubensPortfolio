import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import expoLogo from '../CodingLogos/expodevinv.png';
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';


import LoginViewiPhone from './Screenshots/login(iphone).png';
import SignupViewiPhone from './Screenshots/signup(iphone).png';
import ProfileTabViewiPhone from './Screenshots/profile(iphone).png';
import ProfileTabView2iPhone from './Screenshots/profile2(iphone).png';
import NotificationsView2iPhone from './Screenshots/notifications(iphone).png';
import MovieTabViewiPhone from './Screenshots/movie-tab(iphone).png';
import MovieTrendingViewiPhone from './Screenshots/movie-trending(iphone).png';
import MovieDetailsViewiPhone from './Screenshots/movie-details(iphone).png';
import TVShowTabViewiPhone from './Screenshots/tvshow-tab(iphone).png';
import TVShowDetailsViewiPhone from './Screenshots/tvshow-details(iphone).png';
import MovieWatchlistViewiPhone from './Screenshots/movie-watchlist(iphone).png';
import TVShowWatchlistViewiPhone from './Screenshots/tvshow-watchlist(iphone).png';
import AboutDeveloperViewiPhone from './Screenshots/about-developer(iphone).png';
import LoginViewAndroid from './Screenshots/login(android).png';
import SignupViewAndroid from './Screenshots/signup(android).png';
import ProfileTabViewAndroid from './Screenshots/profile(android).png';
import MovieTabViewAndroid from './Screenshots/movie-tab(android).png';
import MovieDetailsViewAndroid from './Screenshots/movie-details(android).png';
import TVShowTabViewAndroid from './Screenshots/tvshow-tab(android).png';
import TVShowDetailsViewAndroid from './Screenshots/tvshow-details(android).png';
import SearchAndroid from './Screenshots/search(android).png';
import SearchGenreAndroid from './Screenshots/search-genre(android).png';
import MovieWatchlistViewAndroid from './Screenshots/movie-watchlist(android).png';
import TVShowWatchlistViewAndroid from './Screenshots/tvshow-watchlist(android).png';

import Privacy from './Privacy';
import Terms from './Terms';
import FeedbackModal from '../MailForm/FeedbackModal';

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

const WatchlistrMobile = ({ showArrows, nextSlide, prevSlide }) => {
  const WatchlistrScreenshots = [
    LoginViewiPhone,
    SignupViewiPhone,
    ProfileTabViewiPhone,
    ProfileTabView2iPhone,
    NotificationsView2iPhone,
    MovieTabViewiPhone,
    MovieTrendingViewiPhone,
    MovieDetailsViewiPhone,
    TVShowTabViewiPhone,
    TVShowDetailsViewiPhone,
    MovieWatchlistViewiPhone,
    TVShowWatchlistViewiPhone,
    AboutDeveloperViewiPhone,
    LoginViewAndroid,
    SignupViewAndroid,
    ProfileTabViewAndroid,
    MovieTabViewAndroid,
    MovieDetailsViewAndroid,
    TVShowTabViewAndroid,
    TVShowDetailsViewAndroid,
    SearchAndroid,
    SearchGenreAndroid,
    MovieWatchlistViewAndroid,
    TVShowWatchlistViewAndroid
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

  const handlePlayStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/watchlistr/id6459355223", "_blank");
  };

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
      <div className="title-with-arrows">
        {showArrows && (
          <button className="small-nav-arrow" onClick={prevSlide} aria-label="Previous Project">
            &#10094;
          </button>
        )}
        <h1 style={{ fontSize: 32, margin: 0 }}>
          <a
            href="https://apps.apple.com/us/app/watchlistr/id6459355223"
            target="_blank"
            rel="noopener noreferrer"
            className="section-title"
          >
            Watchlistr
          </a>
        </h1>
        {showArrows && (
          <button className="small-nav-arrow" onClick={nextSlide} aria-label="Next Project">
            &#10095;
          </button>
        )}
      </div>
      <div className="centered-content">
        <div className="flex justify-center space-x-4">
          <button onClick={handleAppleStoreButtonClick} className="app-button">Apple Store</button>
          &nbsp;
          <button onClick={handlePlayStoreButtonClick} className="app-button">Play Store</button>
          &nbsp;
          <br />
          <br />
          <button onClick={handleTestFlightButtonClick} className="app-button">TestFlight</button>
          &nbsp;
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
        <p className="prompt">for the full iOS experience of Watchlistr tap TestFlight!</p>
        <div className="project">
          <div className="sections-container">
            <div>
              <div className="project-image-container">
                <div className="image-table-background">
                  <table className="rounded-images-table centered-images-table">
                    <tbody>
                      <tr>
                        {Array.from({ length: numberOfImages }).map((_, i) => (
                          <td align="center" key={i}>
                            <img
                              src={WatchlistrScreenshots[i + currentSet * numberOfImages]}
                              alt={`Watchlistr View ${i + currentSet * numberOfImages}`}
                              width="300"
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="project-description">
                <strong>Discover and track your favorite movies and shows with <span style={{ color: 'cornflowerblue' }}>Watchlistr</span> — your personalized hub for keeping up with the latest releases, hidden gems, and timeless classics.</strong> With an intuitive design, powerful search tools, and smart watchlist management, Watchlistr makes it effortless to stay on top of your entertainment journey.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Browse & Discover:</strong> Explore the latest blockbusters, classic films, and binge-worthy series. Enjoy curated lists, streaming service breakdowns, and dedicated TV show sections highlighting what’s airing today and tomorrow. Sort your content your way with flexible sorting options.</li>
                  <li><strong>Smart Search:</strong> Quickly find movies, shows, actors, or genres with a powerful search feature — complete with search history for fast access. View collections when available for movies and preview genre-based media selections.</li>
                  <li><strong>Detailed Media Info:</strong> Tap into rich details for any title — from episode counts to streaming availability. Jump directly into streaming apps (if installed) or view details on TMDB. Easily explore collections, discover related media through cast connections, and enjoy smart suggestions based on your interests.</li>
                  <li><strong>Share Your Favorites:</strong> Share media directly from its detail page. The recipient is taken straight to the media’s page within the app for seamless sharing and discovery.</li>
                  <li><strong>Custom Notifications:</strong> Stay in the loop with reminders for new releases, upcoming episodes, or rewatch plans — all delivered with a unique notification sound to make your alerts stand out.</li>
                  <li><strong>Manage Your Watchlist:</strong> Mark movies or individual episodes as “watched” and track your progress with badges. Long-press to set reminders, mark as “Watching,” or toggle back to “Done Watching.” Automatically highlight shows with “New Episode” badges and keep your list sorted by status, alphabetically, or by added date. Organize your watchlist into folders and sort by genre for easy management.</li>
                  <li><strong>Personalized Profile:</strong> Customize your profile with a photo, adjust text colors, and choose between light or dark mode. Track how many movies and episodes you’ve watched, view your scheduled notifications, and keep an eye on your new episode counts. Select your default app launch tab — Movies, Profile, or TV Shows.</li>
                  <li><strong>Secure Sign-In Options:</strong> Sign up or log in using Apple or Google for a secure, streamlined experience. Link your provider to your Firebase account for unified login. Not ready to sign up? Try Watchlistr as a guest with the temp user option and explore the features freely.</li>
                </ul>

                <strong>Embark on your cinematic journey — track, discover, and enjoy like never before!</strong>
              </p>

              <div className="logo-container">
                {BuiltWithLogos.map((logo, index) => (
                  <span key={index}>
                    {logo.link ? (
                      <Link to={logo.link}>
                        <img src={logo.src} alt={logo.alt} className="logo" />
                      </Link>
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
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Watchlistr(Mobile)"
      />
    </div>
  );
};

export default WatchlistrMobile;