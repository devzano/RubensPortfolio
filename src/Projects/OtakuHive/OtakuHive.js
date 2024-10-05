import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';

import MangaDetailView from '../OtakuHive/Screenshots/OtakuHive(MangaDetailView).png';
import FullScreenReader from '../OtakuHive/Screenshots/OtakuHive(FullScreenReader).png';
import SavedView from '../OtakuHive/Screenshots/OtakuHive(SavedView).png';
import SearchView from '../OtakuHive/Screenshots/OtakuHive(SearchView).png';

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

const OtakuHive = () => {
  const OtakuHiveScreenshots = [
    MangaDetailView,
    FullScreenReader,
    SavedView,
    SearchView
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (OtakuHiveScreenshots.length > 0) {
      const maxSets = Math.ceil(OtakuHiveScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [OtakuHiveScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/otakuhive/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/otakuhive/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleTestFlightButtonClick = () => {
    window.open("https://testflight.apple.com/join/sRsqfd9y", "_blank");
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
          appName: 'OtakuHive',
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
    if (location.pathname === '/otakuhive/privacy' || location.pathname === '/otakuhive/terms') {
      navigate('/otakuhive');
    }
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/otakuhive/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/otakuhive/privacy') }
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href=" " target="_blank" rel="noopener noreferrer" className="section-title">OtakuHive</a>
      </h1>
      <div className="centered-content">
      <div className="button-group">
          <button onClick={handleTestFlightButtonClick} className="app-button">TestFlight</button>
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
                          <img src={OtakuHiveScreenshots[i + currentSet * numberOfImages]}
                            alt={`OtakuHive View ${i + currentSet * numberOfImages}`}
                            width="300"/>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">Discover a world of manga like never before with OtakuHive, a sleek and powerful manga reader app that connects directly to MangaDex. With an intuitive interface and unique features, OtakuHive makes it easier than ever to explore, read, and save your favorite manga!</p>
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

export default OtakuHive;