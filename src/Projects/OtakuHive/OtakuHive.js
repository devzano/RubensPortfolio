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

const OtakuHive = ({ showArrows, nextSlide, prevSlide }) => {
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
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/otakuhive/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/otakuhive/privacy') }
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
            href="https://testflight.apple.com/join/sRsqfd9y"
            target="_blank"
            rel="noopener noreferrer"
            className="section-title"
          >
            OtakuHive
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
          <button onClick={handleTestFlightButtonClick} className="app-button">TestFlight</button>
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
                          <img src={OtakuHiveScreenshots[i + currentSet * numberOfImages]}
                            alt={`OtakuHive View ${i + currentSet * numberOfImages}`}
                            width="300" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">
                <strong>Discover a world of manga like never before with <span style={{ color: 'cornflowerblue' }}>OtakuHive</span> — a sleek, powerful manga reader that connects directly to MangaDex.</strong> With a clean interface and smooth functionality, OtakuHive makes it effortless to explore, read, and organize your favorite manga titles.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Powered by MangaDex:</strong> Enjoy access to a massive, ever-growing manga library, sourced in real time from the MangaDex database.</li>
                  <li><strong>Random & Latest Manga:</strong> Dive into something new with the Random tab, or keep up with the freshest releases via the Latest Mangas section — updated as soon as new chapters drop.</li>
                  <li><strong>Smart Search:</strong> Looking for something specific? Quickly find any manga by title using the Search tab.</li>
                  <li><strong>Saved Manga:</strong> Bookmark your favorite manga in the Saved tab for easy access anytime — no more scrolling through lists to find what you love.</li>
                  <li><strong>Reading Progress Bookmarks:</strong> OtakuHive remembers your spot! Bookmarks save your page and auto-scroll you back when you reopen a chapter, so you can pick up right where you left off.</li>
                </ul>

                <strong>Your next manga obsession awaits.</strong>
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
        appName="OtakuHive"
      />
    </div>
  );
};

export default OtakuHive;