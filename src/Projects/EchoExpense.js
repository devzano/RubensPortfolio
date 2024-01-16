import React, {useState, useEffect} from 'react';
import '../Portfolio/Portfolio.css';
import '../Projects/Projects.css';
import githubLogo from '../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../Projects/CodingLogos/xcode.png'
import switftuiLogo from '../Projects/CodingLogos/swiftui.png';
import firebaseLogo from '../Projects/CodingLogos/firebase.png';

const EchoExpense = () => {
  const EchoExpenseScreenshots = [
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(LoadingView).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(HomeView).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(AccountView).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(NewBillView2).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(NewBillView3).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(HomeView2).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(HomeView3).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(Details).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(Menu).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(AccountView2).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(AccountView3).png?raw=true",
    "https://github.com/devzano/EchoExpense/raw/main/Screenshots/EchoExpense%20(CalendarView).png?raw=true"
  ];

  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const maxSets = window.innerWidth <= 768 ? EchoExpenseScreenshots.length / 2 : EchoExpenseScreenshots.length / 4;
    const interval = setInterval(() => {
      setCurrentSet(prevSet => (prevSet + 1) % maxSets);
    }, 4000);
    return () => clearInterval(interval);
  }, [EchoExpenseScreenshots.length]);

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/fk5oTPsy", "_blank");
  }

  const numberOfImages = window.innerWidth <= 768 ? 2 : 4;

  const builtWithLogos = [
    xcodeLogo,
    switftuiLogo,
    firebaseLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://github.com/devzano/EchoExpense" target="_blank" rel="noopener noreferrer" className="section-title">EchoExpense</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleBetaButtonClick}
          className="app-button">Beta Testing</button>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
              <table className="rounded-images-table centered-images-table">
                <tr> {
                  Array.from({length: numberOfImages}).map((_, i) => (
                    <td align="center" key={i}>
                      <img src={EchoExpenseScreenshots[i + currentSet * numberOfImages]}
                           alt={`EchoExpense View ${i + currentSet * numberOfImages}`}
                           width="300"/>
                    </td>
                  ))
                } </tr>
              </table>
              </div>
              <p className="project-description">
              Elevate your financial management with Echo Expense. Effortlessly record and categorize your expenses, ensuring financial clarity and control. With Echo Expense, you can effortlessly create, edit, and organize your expenses. Take charge of your finances with Echo Expense.
              </p>
              <div className="logo-container">
                {builtWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === builtWithLogos.length - 1 ? (
                      <a href="https://github.com/devzano/EchoExpense" target="_blank" rel="noopener noreferrer">
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