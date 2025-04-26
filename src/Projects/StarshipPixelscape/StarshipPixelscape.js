import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';

import MainMenuView from '../StarshipPixelscape/Screenshots/StarshipPixelscape(MainMenuView).png';
import GameSettingsView from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GameSettingsView).png';
import GameSettings2View from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GameSettings2View).png';
import GamePlayView from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GamePlayView).png';
import GamePlay2View from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GamePlay2View).png';
import GamePlay3View from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GamePlay3View).png';
import GamePlayBossView from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GamePlayBossView).png';
import GameOverView from '../StarshipPixelscape/Screenshots/StarshipPixelscape(GameOverView).png';

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

const StarshipPixelscape = ({ showArrows, nextSlide, prevSlide }) => {
  const StarshipPixelscapeScreenshots = [
    MainMenuView,
    GameSettingsView,
    GameSettings2View,
    GamePlayView,
    GamePlay2View,
    GamePlay3View,
    GamePlayBossView,
    GameOverView
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (StarshipPixelscapeScreenshots.length > 0) {
      const maxSets = Math.ceil(StarshipPixelscapeScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [StarshipPixelscapeScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/starship-pixelscape/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/starship-pixelscape/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/starship-pixelscape/id6741517533", "_blank");
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
          appName: 'Starship Pixelscape',
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
    if (location.pathname === '/starship-pixelscape/privacy' || location.pathname === '/starship-pixelscape/terms') {
      navigate('/starship-pixelscape');
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
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/starship-pixelscape/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/starship-pixelscape/privacy') }
  ];

  return (
    <div className="coding-background">
      <div className="title-with-arrows">
        {showArrows && (
          <button className="small-nav-arrow" onClick={prevSlide} aria-label="Previous Project">
            &#10094;
          </button>
        )}
        <h1 className="title">
          <a
            href="https://apps.apple.com/us/app/starship-pixelscape/id6741517533"
            target="_blank"
            rel="noopener noreferrer"
            className="section-title"
          >
            Starship Pixelscape
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
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
        <div className="project">
          <div className="sections-container">
            <div>
              <div className="project-image-container">
                <table className="rounded-images-table centered-images-table">
                  <tbody>
                    <tr>
                      {Array.from({ length: numberOfImages }).map((_, i) => (
                        <td align="center" key={i}>
                          <img src={StarshipPixelscapeScreenshots[i + currentSet * numberOfImages]}
                            alt={`Starship Pixelscape View ${i + currentSet * numberOfImages}`}
                            width="300" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">
                <strong>Blast off into an action-packed adventure with <span style={{ color: 'cornflowerblue' }}>Spaceship Pixelscape</span> — a retro-inspired journey through the pixelated cosmos!</strong> Dodge, blast, and conquer your way across the galaxy in a universe packed with danger, challenges, and endless excitement. Whether you're chasing high scores or testing your skills, Spaceship Pixelscape delivers the cosmic thrills you're looking for.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Choose Your Spaceship:</strong> Select from a lineup of unique spaceships, each designed to help you take on the galaxy your way.</li>
                  <li><strong>Shoot Meteors:</strong> Hone your reflexes and aim as meteors rain down in an endless cosmic storm — survive as long as you can!</li>
                  <li><strong>Intuitive Controls:</strong> Play your way with flexible control options — choose between smooth drag controls or classic joystick mode for that authentic arcade feel.</li>
                  <li><strong>Power Up:</strong> Collect game-changing power-ups to boost your ship’s abilities and increase your odds of survival during intense battles.</li>
                  <li><strong>Enemy Ship Encounters:</strong> Engage in fast-paced dogfights with hostile UFOs. Outsmart and outmaneuver your enemies to stay in the fight.</li>
                  <li><strong>Boss Battles:</strong> Face off against colossal bosses that will test your endurance, reflexes, and precision in epic showdowns.</li>
                  <li><strong>Leaderboard Challenge:</strong> Compete for a spot in the Top 10! Track your score and prove you’re the best pilot in the galaxy.</li>
                </ul>

                <strong>Are you ready to take on the galaxy?</strong>
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
        appName="Starship Pixelscape"
      />
    </div>
  );
};

export default StarshipPixelscape;