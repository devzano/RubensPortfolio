import React, { useState, useEffect } from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png';
import coredataLogo from '../../Projects/CodingLogos/coredata.png';
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';

import WelcomeView from '../RecipeRealm/Screenshots/RecipeRealm(WelcomeView).png';
import HomeView from '../RecipeRealm/Screenshots/RecipeRealm(HomeView).png';
import GoogleSearchView from '../RecipeRealm/Screenshots/RecipeRealm(GoogleSearchView).png';
import DetailsView from '../RecipeRealm/Screenshots/RecipeRealm(DetailsView).png';
import Details2View from '../RecipeRealm/Screenshots/RecipeRealm(Details2View).png';
import EditDetailsView from '../RecipeRealm/Screenshots/RecipeRealm(EditDetailsView).png';
import NewRecipeTabView from '../RecipeRealm/Screenshots/RecipeRealm(NewRecipeTabView).png';
import RecipeAssistantView from '../RecipeRealm/Screenshots/RecipeRealm(RecipeAssistantView).png';
import OptionsView from '../RecipeRealm/Screenshots/RecipeRealm(OptionsView).png';
import RecipeContextMenuView from '../RecipeRealm/Screenshots/RecipeRealm(RecipeContextMenuView).png';
import NewFolderView from '../RecipeRealm/Screenshots/RecipeRealm(NewFolderView).png';
import NestedView from '../RecipeRealm/Screenshots/RecipeRealm(NestedView).png';
import FolderContextMenuView from '../RecipeRealm/Screenshots/RecipeRealm(FolderContextMenuView).png';
import InsideFolderView from '../RecipeRealm/Screenshots/RecipeRealm(InsideFolderView).png';
import InsideFolderContextMenuView from '../RecipeRealm/Screenshots/RecipeRealm(InsideFolderContextMenuView).png';
import InsideRecipeFolderRecipeView from '../RecipeRealm/Screenshots/RecipeRealm(InsideRecipeFolderRecipeView).png';

const RecipeRealm = () => {
  const RecipeRealmScreenshots = [
    WelcomeView,
    HomeView,
    GoogleSearchView,
    DetailsView,
    Details2View,
    EditDetailsView,
    NewRecipeTabView,
    RecipeAssistantView,
    OptionsView,
    RecipeContextMenuView,
    NewFolderView,
    NestedView,
    FolderContextMenuView,
    InsideFolderView,
    InsideFolderContextMenuView,
    InsideRecipeFolderRecipeView,
  ];

  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    if (RecipeRealmScreenshots.length > 0) {
      const maxSets = window.innerWidth <= 768 ? RecipeRealmScreenshots.length / 2 : RecipeRealmScreenshots.length / 4;
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [RecipeRealmScreenshots.length]);

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/0ox0x9Rq", "_blank");
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    xcodeLogo,
    coredataLogo,
    switftuiLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://testflight.apple.com/join/0ox0x9Rq" target="_blank" rel="noopener noreferrer" className="section-title">RecipeRealm</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleBetaButtonClick} className="app-button">Beta Testing</button>
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

export default RecipeRealm;