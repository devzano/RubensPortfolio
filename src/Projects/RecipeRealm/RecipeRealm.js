import React, { useState, useEffect } from 'react';
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
    NewRecipeImageView,
    NewRecipeBookImageView,
    NewRecipeImportView,
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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    if (RecipeRealmScreenshots.length > 0) {
      const maxSets = window.innerWidth <= 768 ? RecipeRealmScreenshots.length / 2 : RecipeRealmScreenshots.length / 4;
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [RecipeRealmScreenshots.length]);

  const handleAppStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/reciperealm/id6458877177", "_blank");
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: xcodeLogo, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: coredataLogo, alt: 'CoreData Logo', link: 'https://developer.apple.com/documentation/coredata/' },
    { src: switftuiLogo, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
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
        <a href="https://apps.apple.com/us/app/reciperealm/id6458877177" target="_blank" rel="noopener noreferrer" className="section-title">RecipeRealm</a>
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

export default RecipeRealm;