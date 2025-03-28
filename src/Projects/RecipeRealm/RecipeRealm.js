import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import coredataLogo from '../../Projects/CodingLogos/coredata.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';

import WelcomeView from '../RecipeRealm/Screenshots/RecipeRealm(WelcomeView).png';
import HomeView from '../RecipeRealm/Screenshots/RecipeRealm(HomeView).png';
import OpenBookView from '../RecipeRealm/Screenshots/RecipeRealm(OpenBookView).png';
import OpenBookDetailView from '../RecipeRealm/Screenshots/RecipeRealm(OpenBookDetailView).png';
import DetailsView from '../RecipeRealm/Screenshots/RecipeRealm(DetailsView).png';
import Details2View from '../RecipeRealm/Screenshots/RecipeRealm(Details2View).png';
import EditDetailsView from '../RecipeRealm/Screenshots/RecipeRealm(EditDetailsView).png';
import EditDetails2View from '../RecipeRealm/Screenshots/RecipeRealm(EditDetails2View).png';
import NewRecipeView from '../RecipeRealm/Screenshots/RecipeRealm(NewRecipeView).png';
import NewRecipeImportView from '../RecipeRealm/Screenshots/RecipeRealm(NewRecipeImportView).png';
import NewRecipeImageView from '../RecipeRealm/Screenshots/RecipeRealm(NewRecipeImageView).png';
import NewRecipeBookImageView from '../RecipeRealm/Screenshots/RecipeRealm(NewRecipeBookImageView).png';
import NewBookView from '../RecipeRealm/Screenshots/RecipeRealm(NewBookView).png';
import RecipeContextOptionsView from '../RecipeRealm/Screenshots/RecipeRealm(RecipeContextOptionsView).png';
import RecipeBookContextOptionsView from '../RecipeRealm/Screenshots/RecipeRealm(RecipeBookContextOptionsView).png';
import RecipeBookContextView from '../RecipeRealm/Screenshots/RecipeRealm(RecipeBookContextView).png';
import RandomBannerView from '../RecipeRealm/Screenshots/RecipeRealm(RandomBannerView).png';
import OptionsView from '../RecipeRealm/Screenshots/RecipeRealm(OptionsView).png';
import ChangeTintView from '../RecipeRealm/Screenshots/RecipeRealm(ChangeTintView).png';
import ChangeThemeView from '../RecipeRealm/Screenshots/RecipeRealm(ChangeThemeView).png';

import Terms from './Terms';
import Privacy from './Privacy';

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

const RecipeRealm = () => {
  const RecipeRealmScreenshots = [
    WelcomeView,
    HomeView,
    OpenBookView,
    OpenBookDetailView,
    DetailsView,
    Details2View,
    EditDetailsView,
    EditDetails2View,
    NewRecipeView,
    NewRecipeImportView,
    NewRecipeImageView,
    NewRecipeBookImageView,
    NewBookView,
    RecipeBookContextView,
    RecipeBookContextOptionsView,
    RecipeContextOptionsView,
    RandomBannerView,
    OptionsView,
    ChangeTintView,
    ChangeThemeView
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (RecipeRealmScreenshots.length > 0) {
      const maxSets = Math.ceil(RecipeRealmScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [RecipeRealmScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/reciperealm/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/reciperealm/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/reciperealm/id6458877177", "_blank");
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
          appName: 'RecipeRealm',
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
    if (location.pathname === '/reciperealm/privacy' || location.pathname === '/reciperealm/terms') {
      navigate('/reciperealm');
    }
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: coredataLogo, alt: 'CoreData Logo', link: 'https://developer.apple.com/documentation/coredata/' },
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/reciperealm/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/reciperealm/privacy') }
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/reciperealm/id6458877177" target="_blank" rel="noopener noreferrer" className="section-title">RecipeRealm</a>
      </h1>
      <div className="centered-content">
        <div className="button-group">
          <button onClick={handleAppleStoreButtonClick} className="app-button">Apple Store</button>
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
                          <img src={RecipeRealmScreenshots[i + currentSet * numberOfImages]}
                            alt={`RecipeRealm View ${i + currentSet * numberOfImages}`}
                            width="300" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">
                Discover a world of flavors with RecipeRealm. Easily create, store, and edit diverse recipes with images, prep/cook times, ingredients, and detailed steps. Explore new recipes with the in-app browser and capture its ingredient list from the web page from the scan button! Find your recipes quickly with the search bar. I’ve included one of my own recipes when you first install, hope you enjoy! I made my app customizable by letting you change the tint color, share and import recipes with each other, also create folders to group recipes. Elevate your cooking journey today!
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

export default RecipeRealm;