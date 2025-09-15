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

import LogiqoHomeView_iOS from '../Logiqo/Screenshots/HomeView(ios).png';
import LogiqoDailyView_iOS from '../Logiqo/Screenshots/DailyView(ios).png';
import LogiqoProfileView_iOS from '../Logiqo/Screenshots/ProfileView(ios).png';
import LogiqoProfileCustomColorView_iOS from '../Logiqo/Screenshots/ProfileCustomColorView(ios).png';
import LogiqoHomeView_Android from '../Logiqo/Screenshots/HomeView(android).jpg';
import LogiqoDailyView_Android from '../Logiqo/Screenshots/DailyView(android).jpg';
import LogiqoProfileView_Android from '../Logiqo/Screenshots/ProfileView(android).jpg';
import LogiqoProfileCustomColorView_Android from '../Logiqo/Screenshots/ProfileCustomColorView(android).jpg';

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

const Logiqo = ({ showArrows, nextSlide, prevSlide }) => {
  const logiqoScreenshots = [
    LogiqoHomeView_iOS,
    LogiqoDailyView_iOS,
    LogiqoProfileView_iOS,
    LogiqoProfileCustomColorView_iOS,
    LogiqoHomeView_Android,
    LogiqoDailyView_Android,
    LogiqoProfileView_Android,
    LogiqoProfileCustomColorView_Android
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (logiqoScreenshots.length > 0) {
      const maxSets = Math.ceil(logiqoScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [logiqoScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/logiqo/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/logiqo/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/Logiqo/id6752290923", "_blank");
  };

  const handlePlayStoreButtonClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.devzano.Logiqo", "_blank");
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
          appName: 'Logiqo',
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
    if (location.pathname === '/logiqo/privacy' || location.pathname === '/logiqo/terms') {
      navigate('/logiqo');
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
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/logiqo/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/logiqo/privacy') }
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
            href="https://www.rubenmanzano.com/logiqo"
            target="_blank"
            rel="noopener noreferrer"
            className="section-title"
          >
            Logiqo
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
                            <img
                              src={logiqoScreenshots[i + currentSet * numberOfImages]}
                              alt={`Logiqo View ${i + currentSet * numberOfImages}`}
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
                <strong>
                  Sharpen your mind with puzzles and classic board games — all in one sleek app.
                  <br />
                  <span style={{ color: 'slateblue' }}>Logiqo</span> brings together timeless favorites like Sudoku and Word Search with strategy classics like Chess and Checkers, wrapped in a clean, modern design.
                </strong>

                <br /><br />

                <strong>Games you’ll find inside:</strong>
                <ul className="features-list">
                  <li><strong>Sudoku –</strong> Fill the 9×9 grid with logic and focus.</li>
                  <li><strong>Word Search –</strong> Spot hidden words in every direction.</li>
                  <li><strong>Chess –</strong> Outthink your opponent with strategy and tactics.</li>
                  <li><strong>Checkers –</strong> Jump, crown, and claim victory.</li>
                  <li><strong>Minesweeper –</strong> Use number clues to clear the board—avoid the mines.</li>
                  <li><strong>Trivia –</strong> Quick-fire questions to test your knowledge across topics.</li>
                </ul>

                <strong>Features to keep you playing:</strong>
                <ul className="features-list">
                  <li><strong>Daily puzzles &amp; streaks:</strong> Stay motivated with fresh challenges.</li>
                  <li><strong>Save &amp; continue:</strong> Pick up right where you left off — never lose progress.</li>
                  <li><strong>Custom colors:</strong> Match the game to your style.</li>
                  <li><strong>Helpful hints:</strong> Nudge yourself past tricky moments.</li>
                  <li><strong>Distraction-free design:</strong> Smooth, modern UI that keeps the focus on play.</li>
                </ul>

                <strong>
                  Whether you’re looking for a quick brain-teaser on the go or a deep match of strategy,
                  <span style={{ color: 'slateblue' }}> Logiqo</span> is your pocket logic companion.
                  &nbsp; Download now and start your streak today!
                </strong>
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
        appName="Logiqo"
      />
    </div>
  );
};

export default Logiqo;