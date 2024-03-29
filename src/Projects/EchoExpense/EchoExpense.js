import React, { useState, useEffect } from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';
import firebaseLogo from '../../Projects/CodingLogos/firebase.png';

import LoadingView from '../EchoExpense/Screenshots/EchoExpense(LoadingView).png';
import HomeView from '../EchoExpense/Screenshots/EchoExpense(HomeView).png';
import AccountView from '../EchoExpense/Screenshots/EchoExpense(AccountView).png';
import NewBillView from '../EchoExpense/Screenshots/EchoExpense(NewBillView).png';
import NewBillView2 from '../EchoExpense/Screenshots/EchoExpense(NewBillView2).png';
import HomeView2 from '../EchoExpense/Screenshots/EchoExpense(HomeView2).png';
import HomeView3 from '../EchoExpense/Screenshots/EchoExpense(HomeView3).png';
import Details from '../EchoExpense/Screenshots/EchoExpense(Details).png';
import Menu from '../EchoExpense/Screenshots/EchoExpense(Menu).png';
import AccountView2 from '../EchoExpense/Screenshots/EchoExpense(AccountView2).png';
import AccountView3 from '../EchoExpense/Screenshots/EchoExpense(AccountView3).png';
import CalendarView from '../EchoExpense/Screenshots/EchoExpense(CalendarView).png';

const EchoExpense = () => {
  const EchoExpenseScreenshots = [
    HomeView,
    LoadingView,
    AccountView,
    NewBillView,
    NewBillView2,
    HomeView2,
    HomeView3,
    Details,
    Menu,
    AccountView2,
    AccountView3,
    CalendarView
  ];

  const [currentSet, setCurrentSet] = useState(0);

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
  }

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    xcodeLogo,
    switftuiLogo,
    firebaseLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/echoexpense/id6475660500" target="_blank" rel="noopener noreferrer" className="app-link">EchoExpense</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleAppStoreButtonClick} className="app-button">Available on the App Store</button>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
                <table className="rounded-images-table centered-images-table">
                  <tr> {
                    Array.from({ length: numberOfImages }).map((_, i) => (
                      <td align="center" key={i}>
                        <img src={EchoExpenseScreenshots[i + currentSet * numberOfImages]}
                          alt={`EchoExpense Screenshot ${i + currentSet * numberOfImages}`}
                          width="300" />
                      </td>
                    ))
                  } </tr>
                </table>
              </div>
              <p className="project-description">
                Elevate your financial management with Echo Expense, an iOS application designed to empower you in managing your bills. With Echo Expense, you can seamlessly create, edit, and organize your bills while configuring timely personalized notifications for payments, ensuring financial clarity and control. Take charge of your finances and maintain a comprehensive record of your expenses, paid bills, and notifications with the precision and convenience of Echo Expense.
              </p>
              <div className="logo-container">
                {BuiltWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === BuiltWithLogos.length - 1 ? (
                      <a href="https://github.com/devzano" target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default EchoExpense;