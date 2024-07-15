import React, { useState, useEffect } from 'react';
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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    if (EchoExpenseScreenshots.length > 0) {
      const maxSets = window.innerWidth <= 768 ? EchoExpenseScreenshots.length / 2 : EchoExpenseScreenshots.length / 4;
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [EchoExpenseScreenshots.length]);

  const handleAppStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/echoexpense/id6475660500", "_blank");
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

  const closeModal = () => {
    setIsTermsModalOpen(false);
    setIsPrivacyModalOpen(false);
  };

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/echoexpense/id6475660500" target="_blank" rel="noopener noreferrer" className="app-link">EchoExpense</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleAppStoreButtonClick} className="app-button">App Store</button>
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
                            width="300" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="project-description">
                Elevate your financial management with Echo Expense, an iOS application designed to empower you in managing your bills. With Echo Expense, you can seamlessly create, edit, and organize your bills while configuring timely personalized notifications for payments, ensuring financial clarity and control. Take charge of your finances and maintain a comprehensive record of your expenses, paid bills, and notifications with the precision and convenience of Echo Expense.
              </p>
              <div className="logo-container">
                {BuiltWithLogos.map((logo, index) => (
                  <span key={index}>
                    {logo.link ? (
                      <a href={logo.link} target="_blank" rel="noopener noreferrer">
                        <img src={logo.src} alt={logo.alt} className="logo" />
                      </a>
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
      {isTermsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe src="" title="Terms of Use"></iframe>
          </div>
        </div>
      )}
      {isPrivacyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe src="" title="Privacy Policy"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default EchoExpense;
