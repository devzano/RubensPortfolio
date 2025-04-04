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

import Home from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Home).png'
import Contact from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Contact).png'
import Events from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Events).png'
import Maps from '../SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge(Maps).png'

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

const SunshineKeyWestChallenge = () => {
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
      <h1 className="title">
        <a href="https://www.rubenmanzano.com/sunshinekeywestchallenge" target="_blank" rel="noopener noreferrer" className="app-link">Sunshine Key West Challenge</a>
      </h1>
      <div className="centered-content">
        <div className="button-group">
          <button onClick={handleAppleStoreButtonClick} className="app-button">Apple Store</button>
          &nbsp;
          <button onClick={handlePlayStoreButtonClick} className="app-button">Play Store</button>
          &nbsp;
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
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
              <p className="project-description">
              The Sunshine Key West Challenge app brings the excitement and purpose of this cherished annual tournament right to your fingertips! Learn more about the inspiring history of the tournament, founded to support the Diabetes Research Institute’s mission to find a cure for Type 1 diabetes. Discover a detailed schedule of the tournament events, explore unique auction items, and browse a gallery of memorable angler photos. Stay close to the action with a handy Nearby section, offering food recommendations around the event’s location. With every tap, feel the spirit of camaraderie and community at the Sunshine Key West Challenge.
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
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        title="Send Feedback"
      >
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <h2 className="modal-title">Send Feedback</h2>
          <label className="form-label">
            First Name:
            <input
              type="text"
              value={feedback.firstName}
              onChange={(e) => setFeedback({ ...feedback, firstName: e.target.value })}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Last Name:
            <input
              type="text"
              value={feedback.lastName}
              onChange={(e) => setFeedback({ ...feedback, lastName: e.target.value })}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Message:
            <textarea
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
              className="form-input form-textarea"
            />
          </label>
          <button type="submit" className="app-button">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default SunshineKeyWestChallenge;