import React, { useState, useEffect } from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import reactLogo from '../../Projects/CodingLogos/react.png';
import viteLogo from '../../Projects/CodingLogos/vite.png';
import vsLogo from '../../Projects/CodingLogos/visualstudio.png';
import jsLogo from '../../Projects/CodingLogos/javascript.png';

import LoginPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(LoginPage).png';
import SignupPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(SignupPage).png';
import HomePage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(HomePage).png';
import MoviesPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(MoviesPage).png';
import TVShowsPage from '../Watchlistr-Web/Screenshots/WatchlistrWeb(TVShowsPage).png';

const WatchlistrWeb = () => {
  const WatchlistrWebScreens = [
    LoginPage,
    SignupPage,
    HomePage,
    MoviesPage,
    TVShowsPage
  ];

  const [watchlistrIndex, setWatchlistrIndex] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistrIndex((prevIndex) => (prevIndex + 1) % WatchlistrWebScreens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [WatchlistrWebScreens.length]);

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

  const builtWithLogos = [
    vsLogo,
    jsLogo,
    reactLogo,
    viteLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <div className="centered-content">
        <h1 className="title">
          <a href="https://watchlistrweb.vercel.app" target="_blank" rel="noopener noreferrer" className="section-title">Watchlistr</a>
        </h1>
        <div className="flex justify-center space-x-4">
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
                <img src={WatchlistrWebScreens[watchlistrIndex]} alt={`Project ${watchlistrIndex + 1}`} className="project-image" style={{ width: '100%', maxHeight: '500px' }} />
              </div>
              <p className="project-description">
                Embarking on my journey into development, I created Watchlistr as a platform to enhance one's entertainment experience. Initially, it was only a website, and I have now seamlessly integrated it with my <a href="https://www.rubenmanzano.com/watchlistr-ios" target="_blank" rel="noopener noreferrer">iOS app</a>, allowing users to enjoy a unified experience. You can easily login or create an account on either platform.
              </p>
              <p className="project-description">
                Watchlistr makes it simple for you to create personal watchlists and track your favorite Movies and TV Shows. Discover upcoming releases, explore popular picks, and check out top-rated media, all in one place. My mission is to empower you to collect and save all those must-see and classic titles for your future viewing pleasure. Join today and never miss out on the media you love!
              </p>
              <div className="logo-container">
                {builtWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === builtWithLogos.length - 1 ? (
                      <a href="https://github.com/devzano/" target="_blank" rel="noopener noreferrer">
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
      <Modal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} title="Send Feedback">
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

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default WatchlistrWeb;