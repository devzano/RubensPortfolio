import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

const EchoExpense = ({ showArrows, nextSlide, prevSlide }) => {
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
  const navigate = useNavigate();

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

  const handleAppleStoreButtonClick = () => {
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

  const handleCloseModal = (modalSetter) => {
    modalSetter(false);
    if (location.pathname === '/echoexpense/privacy' || location.pathname === '/echoexpense/terms') {
      navigate('/echoexpense');
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
    { src: firebaseLogo, alt: 'Firebase Logo', link: 'https://firebase.google.com/' },
    { src: termsConditions, alt: 'Terms and Conditions', onClick: () => navigate('/echoexpense/terms') },
    { src: privacyPolicy, alt: 'Privacy Policy', onClick: () => navigate('/echoexpense/privacy') }
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
            href="https://apps.apple.com/us/app/echoexpense/id6475660500"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            EchoExpense
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
                          <img src={EchoExpenseScreenshots[i + currentSet * numberOfImages]}
                            alt={`EchoExpense Screenshot ${i + currentSet * numberOfImages}`}
                            width="300" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">
                <strong>Stay on top of your current and upcoming bills in style with <span style={{ color: 'cornflowerblue' }}>EchoExpense</span> — your all-in-one solution for effortless bill management and financial clarity.</strong> Easily review past payments, manage notifications, and keep your finances organized with an intuitive and modern interface.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Manage Bills:</strong> Quickly create bills, view details, edit, mark as paid, and track payment history. Customize notifications to fit your schedule.</li>
                  <li><strong>Bill Details View:</strong> Minimal yet powerful. Access three intuitive actions:
                    <ul className="features-sublist">
                      <li>🟡 <strong>Menu Icon:</strong> View bill history and manage notifications.</li>
                      <li>🔵 <strong>Notepad Icon:</strong> Edit bill details and save updates easily.</li>
                      <li>🟢 <strong>Banknote Icon:</strong> Mark bills as paid or unpaid. Categorize payments as "On Time" or "Late" for accurate record-keeping.</li>
                    </ul>
                  </li>
                  <li><strong>Payday Management:</strong> Add paydays and track your income with end-of-month calculations that help you manage deductions, taxes, and financial overviews.</li>
                  <li><strong>Calendar History:</strong> View both past and upcoming bills alongside paydays. Tap on any day to see its associated bills for better planning and history review.</li>
                  <li><strong>Profile Insights:</strong> Personalize your profile with a photo or initials. Instantly see your total remaining balance, amount paid, and projected profits for the current and upcoming months. Easily edit account details and link your Google or Apple account.</li>
                  <li><strong>Paid / Unpaid Bills Logic:</strong> Automatically generate the next bill upon marking one as paid. Enable auto-pay for confirmation alerts, or let unpaid bills revert to upcoming/past-due status to stay informed.</li>
                  <li><strong>Smart Notifications:</strong> Choose your preferred alert time (8 AM, 12 PM, or 4 PM). Get a last-chance reminder at 3 PM on the due date if a bill remains unpaid, with proactive reminders leading up to the due date.</li>
                  <li><strong>Smart Savings Bundle:</strong> Take control of your finances with budget creation, savings tracking, and intuitive progress monitoring through the Smart Savings feature.</li>
                  <li><strong>Feedback UI:</strong> Help shape EchoExpense by submitting feedback or feature requests directly within the app.</li>
                  <li><strong>Seamless Sign-In:</strong> Enjoy easy account creation and login with Apple or Google for a smooth, hassle-free experience.</li>
                </ul>

                <strong>Why EchoExpense?</strong> <br />
                Keep your finances organized, stay ahead of your bills, and confidently manage your payments — all in one place.
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
        appName="EchoExpense"
      />
    </div>
  );
};

export default EchoExpense;