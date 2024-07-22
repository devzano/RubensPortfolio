import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';
import privacyPolicy from '../../Projects/CodingLogos/privacy-policy.png';
import termsConditions from '../../Projects/CodingLogos/terms-conditions.png';

import LoginView from '../EchoExpense/Screenshots/EchoExpense(LoginView).png';
import SignupView from '../EchoExpense/Screenshots/EchoExpense(SignupView).png';
import LoadingView from '../EchoExpense/Screenshots/EchoExpense(LoadingView).png';
import HomeNoBillPaydayView from '../EchoExpense/Screenshots/EchoExpense(HomeNoBillPaydayView).png';
import NewBillPaydayMenuView from '../EchoExpense/Screenshots/EchoExpense(NewBillPaydayMenuView).png';
import BlankNewBillPaydayView from '../EchoExpense/Screenshots/EchoExpense(BlankNewBillPaydayView).png';
import NewBillView from '../EchoExpense/Screenshots/EchoExpense(NewBillView).png';
import NewPaydayView from '../EchoExpense/Screenshots/EchoExpense(NewPaydayView).png';
import NewBillView2 from '../EchoExpense/Screenshots/EchoExpense(NewBillView2).png';
import NewBillView3 from '../EchoExpense/Screenshots/EchoExpense(NewBillView3).png';
import HomeView2 from '../EchoExpense/Screenshots/EchoExpense(HomeView2).png';
import AccountView from '../EchoExpense/Screenshots/EchoExpense(AccountView).png';
import AccountView2 from '../EchoExpense/Screenshots/EchoExpense(AccountView2).png';
import HomeView3 from '../EchoExpense/Screenshots/EchoExpense(HomeView3).png';
import Details from '../EchoExpense/Screenshots/EchoExpense(Details).png';
import Menu from '../EchoExpense/Screenshots/EchoExpense(Menu).png';
import SideMenuView from '../EchoExpense/Screenshots/EchoExpense(SideMenuView).png';
import HomeView4 from '../EchoExpense/Screenshots/EchoExpense(HomeView4).png';
import AccountView3 from '../EchoExpense/Screenshots/EchoExpense(AccountView3).png';
import CalendarView from '../EchoExpense/Screenshots/EchoExpense(CalendarView).png';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  let content;

  if (title === "Privacy Policy") {
    content = (
      <iframe
        src="https://doc-hosting.flycricket.io/echoexpense-privacy-policy/2b68a45d-2065-47dc-bb63-fbe8319c5c47/privacy"
        title="Privacy Policy"
        width="100%"
        height="600px"
      ></iframe>
    );
  } else if (title === "Terms of Use") {
    content = (
      <iframe
        src="https://doc-hosting.flycricket.io/echoexpense-terms-of-use/6d2d83d0-ac0b-4053-87d5-5237309bba5e/terms"
        title="Terms of Use"
        width="100%"
        height="600px"
      ></iframe>
    );
  } else {
    content = children;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        {content}
      </div>
    </div>
  );
};

const EchoExpense = () => {
  const EchoExpenseScreenshots = [
    LoginView,
    SignupView,
    LoadingView,
    HomeNoBillPaydayView,
    NewBillPaydayMenuView,
    BlankNewBillPaydayView,
    NewBillView,
    NewPaydayView,
    NewBillView2,
    NewBillView3,
    HomeView2,
    AccountView,
    AccountView2,
    HomeView3,
    Details,
    Menu,
    SideMenuView,
    HomeView4,
    AccountView3,
    CalendarView
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const location = useLocation();

  useEffect(() => {
    if (EchoExpenseScreenshots.length > 0) {
      const maxSets = Math.ceil(EchoExpenseScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [EchoExpenseScreenshots.length]);

  useEffect(() => {
    if (location.pathname === '/echoexpense/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (location.pathname === '/echoexpense/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [location.pathname]);

  const handleAppStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/echoexpense/id6475660500", "_blank");
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
          appName: 'EchoExpense',
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

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: firebaseLogo, alt: 'Firebase Logo', link: 'https://firebase.google.com/' },
    { src: githubLogo, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => setIsTermsModalOpen(true) },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => setIsPrivacyModalOpen(true) }
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/echoexpense/id6475660500" target="_blank" rel="noopener noreferrer" className="app-link">EchoExpense</a>
      </h1>
      <div className="centered-content">
        <div className="button-group">
          <button onClick={handleAppStoreButtonClick} className="app-button">App Store</button>
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
                          <img src={EchoExpenseScreenshots[i + currentSet * numberOfImages]}
                            alt={`EchoExpense Screenshot ${i + currentSet * numberOfImages}`}
                            width="300"/>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">
                Elevate your financial management with EchoExpense, an iOS application designed to empower you in managing your bills. With EchoExpense, you can seamlessly create, edit, and organize your bills while configuring timely personalized notifications for payments, ensuring financial clarity and control. Take charge of your finances and maintain a comprehensive record of your expenses, paid bills, and notifications with the precision and convenience of EchoExpense.
              </p>
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
      <Modal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} title="Terms of Use"/>
      <Modal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} title="Privacy Policy"/>
      <Modal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} title="Send Feedback">
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
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

export default EchoExpense;