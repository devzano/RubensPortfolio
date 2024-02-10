import React, {useState, useEffect} from 'react';
import '../../Portfolio/Portfolio.css';
import '../../Projects/Projects.css';
import githubLogo from '../../Projects/CodingLogos/github(light).png';
import xcodeLogo from '../../Projects/CodingLogos/xcode.png'
import coredataLogo from '../../Projects/CodingLogos/coredata.png'
import switftuiLogo from '../../Projects/CodingLogos/swiftui.png';

const RecipeRealm = () => {
  const RecipeRealmScreenshots = [
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Home).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Options).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Home2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(ContextMenu).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(CreateFolder).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(NestedFolder).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(InsideFolder).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Detail).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Detail2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Edit).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(New).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(New2).png?raw=true"
  ];

  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const maxSets = window.innerWidth <= 768 ? RecipeRealmScreenshots.length / 2 : RecipeRealmScreenshots.length / 4;
    const interval = setInterval(() => {
      setCurrentSet(prevSet => (prevSet + 1) % maxSets);
    }, 4000);
    return () => clearInterval(interval);
  }, [RecipeRealmScreenshots.length]);

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/0ox0x9Rq", "_blank");
  }

  const numberOfImages = window.innerWidth <= 768 ? 2 : 4;

  const builtWithLogos = [
    xcodeLogo,
    coredataLogo,
    switftuiLogo,
    githubLogo
  ];

  return (
    <div className="coding-background">
      <h1 className="title">
      {/* https://apps.apple.com/us/app/reciperealm/id6458877177 */}
        <a href="https://testflight.apple.com/join/0ox0x9Rq" target="_blank" rel="noopener noreferrer" className="section-title">RecipeRealm</a>
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
                      <img src={RecipeRealmScreenshots[i + currentSet * numberOfImages]}
                           alt={`RecipeRealm View ${i + currentSet * numberOfImages}`}
                           width="300"/>
                    </td>
                  ))
                } </tr>
              </table>
              </div>
              <p className="project-description">
              Discover a world of flavors with RecipeRealm. Easily create, store, and edit diverse recipes with images, prep/cook times, ingredients, and detailed steps. Explore new recipes with the in-app browser and capture its ingredient list from the web page from the scan button! Find your recipes quickly with the search bar. I’ve included one of my own recipes when you first install, hope you enjoy! I made my app customizable by letting you change the tint color, share and import recipes with each other, also create folders to group recipes. Elevate your cooking journey today!
              </p>
              <div className="logo-container">
                {builtWithLogos.map((logo, index) => (
                  <span key={index}>
                    {index === builtWithLogos.length - 1 ? (
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