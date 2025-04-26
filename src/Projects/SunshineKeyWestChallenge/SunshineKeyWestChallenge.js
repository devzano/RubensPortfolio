import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import reactnativeLogo from '../../Projects/CodingLogos/reactnative.png';
import expoLogo from '../CodingLogos/expodevinv.png';
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';
import Privacy from './Privacy';
import Terms from './Terms';

import Home from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Home).png';
import Contact from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Contact).png';
import Events from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Events).png';
import Maps from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Maps).png';
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

const SunshineKeyWestChallenge = ({ showArrows, nextSlide, prevSlide }) => {
  const SunshineKeyWestChallengeScreenshots = [
    Home, Contact, Events, Maps
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (SunshineKeyWestChallengeScreenshots.length > 0) {
      const maxSets = Math.ceil(SunshineKeyWestChallengeScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [SunshineKeyWestChallengeScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/sunshinekeywestchallenge/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/sunshinekeywestchallenge/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954", "_blank");
  };

  const handlePlayStoreButtonClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.devzano.SunshineKeyWestChallenge", "_blank");
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
          appName: 'Sunshine Key West Challenge',
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
    if (location.pathname === '/sunshinekeywestchallenge/privacy' || location.pathname === '/sunshinekeywestchallenge/terms') {
      navigate('/sunshinekeywestchallenge');
    }
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: reactnativeLogo, alt: 'React Native Logo', link: 'https://reactnative.dev/' },
    { src: expoLogo, alt: 'Expo Logo', link: 'https://docs.expo.dev/' },
    { src: firebaseLogo, alt: 'Firebase Logo', link: 'https://firebase.google.com/' },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/sunshinekeywestchallenge/privacy') },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/sunshinekeywestchallenge/terms') }
  ];

  return (
    <div className="coding-background">
      <div className="title-with-arrows">
        {showArrows && (
          <button className="small-nav-arrow" onClick={prevSlide} aria-label="Previous Project">
            &#10094;
          </button>
        )}
        <h1 className="title" style={{ fontSize: 32, margin: 0 }}>
          <a
            href="https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Sunshine Key West Challenge
          </a>
        </h1>
        {showArrows && (
          <button className="small-nav-arrow" onClick={nextSlide} aria-label="Next Project">
            &#10095;
          </button>
        )}
      </div>

      <div className="centered-content">
        <div className="button-group">
          <button onClick={handleAppleStoreButtonClick} className="app-button">Apple Store</button>
          &nbsp;
          <button onClick={handlePlayStoreButtonClick} className="app-button">Play Store</button>
          <br />
          <br />
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
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
                            <img src={SunshineKeyWestChallengeScreenshots[i + currentSet * numberOfImages]}
                              alt={`SunshineKeyWestChallenge Screenshot ${i + currentSet * numberOfImages}`}
                              width="300" />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="project-description">
                <strong>Experience the excitement and heart of the <span style={{ color: 'cornflowerblue' }}>Sunshine Key West Challenge</span> — a cherished annual fishing tournament dedicated to supporting the Diabetes Research Institute’s mission to find a cure for Type 1 diabetes.</strong> Stay connected to the tournament’s purpose, schedule, and community right from your fingertips.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Tournament History:</strong> Learn about the inspiring story behind the Sunshine Key West Challenge and its mission-driven partnership with the Diabetes Research Institute.</li>
                  <li><strong>Event Schedule:</strong> Access a detailed, easy-to-follow schedule of tournament events so you never miss a moment of the action.</li>
                  <li><strong>Exclusive Auction Items:</strong> Browse and explore unique auction listings — all supporting the event’s charitable cause.</li>
                  <li><strong>Photo Gallery:</strong> Relive memorable moments with a collection of angler photos captured throughout past and current tournaments.</li>
                  <li><strong>Nearby Recommendations:</strong> Discover local food spots and recommendations near the event location, making your stay even more enjoyable.</li>
                  <li><strong>Feel the Community Spirit:</strong> With every tap, connect to the passion, camaraderie, and shared purpose that make this event so special.</li>
                </ul>

                <strong>A community united for a cause — celebrating the sport, the spirit, and the mission to make a difference.</strong>
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
        appName="Sunshine Key West Challenge"
      />
    </div>
  );
};

export default SunshineKeyWestChallenge;