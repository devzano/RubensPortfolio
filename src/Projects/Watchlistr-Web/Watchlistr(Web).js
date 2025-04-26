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
import FeedbackModal from '../MailForm/FeedbackModal';

const WatchlistrWeb = ({ showArrows, nextSlide, prevSlide }) => {
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
      <div className="title-with-arrows">
        {showArrows && (
          <button className="small-nav-arrow" onClick={prevSlide} aria-label="Previous Project">
            &#10094;
          </button>
        )}
        <h1 className="title">
          <a
            href="https://watchlistrweb.vercel.app"
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
          <button onClick={() => window.open('https://www.watchlistr.app/', '_blank')} className="app-button">Landing Page</button>
          &nbsp;
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
        <div className="project">
          <div className="sections-container">
            <div>
              <div className="project-image-container">
                <img src={WatchlistrWebScreens[watchlistrIndex]} alt={`Project ${watchlistrIndex + 1}`} className="project-image" style={{ width: '100%', maxHeight: '500px' }} />
              </div>
              <p className="project-description">
                <strong>Enhance your entertainment experience with <span style={{ color: 'cornflowerblue' }}>Watchlistr</span> — a platform designed to help you track, discover, and organize your favorite Movies and TV Shows across web and iOS.</strong> What began as a personal web project has now evolved into a seamless, integrated experience between the <a href="https://www.watchlistr.app/" target="_blank" rel="noopener noreferrer">web platform</a> and the <a href="https://www.rubenmanzano.com/watchlistr-ios" target="_blank" rel="noopener noreferrer">iOS app</a>, allowing you to stay connected to your watchlist anywhere.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Unified Experience:</strong> Log in or create an account on either platform — your watchlists stay in sync between the web and mobile apps.</li>
                  <li><strong>Personal Watchlists:</strong> Build and manage your own custom watchlists. Keep track of the movies and shows you're watching, have finished, or plan to watch.</li>
                  <li><strong>Discover New Content:</strong> Browse upcoming releases, explore popular picks, and check out top-rated titles, all conveniently in one place.</li>
                  <li><strong>Streaming Availability:</strong> Quickly find out where your favorite movies and shows are available to stream or rent.</li>
                  <li><strong>Intuitive Browsing:</strong> Sort and filter content to explore the latest blockbusters, binge-worthy series, and hidden gems across various genres.</li>
                  <li><strong>Seamless Account Integration:</strong> Whether on desktop or mobile, your watchlist and preferences stay consistent for a hassle-free viewing experience.</li>
                </ul>

                <strong>Why Watchlistr?</strong> <br />
                Empower yourself to never miss out on the movies and TV shows you love. Join today, create your personalized watchlist, and enjoy a smarter way to track your entertainment journey!
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
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Watchlistr(Web)"
      />
    </div>
  );
};

export default WatchlistrWeb;