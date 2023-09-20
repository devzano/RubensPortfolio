import React from 'react';

const RecipeRealm = () => {
  const RecipeRealmScreenshots = [
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Home).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Home2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Share).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(New).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(New2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Detail).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Detail2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Edit).png?raw=true"
  ];

  const handleBetaButtonClick = () => {
    window.open("https://testflight.apple.com/join/0ox0x9Rq", "_blank");
  }

  return (
    <div className="centered-content">
      <a href="https://apps.apple.com/us/app/reciperealm/id6458877177" target="_blank" rel="noopener noreferrer" className="link-font">RecipeRealm</a>
      <br/>
      <button onClick={handleBetaButtonClick} className="beta-button">Beta Testing</button>
      <div className="project-image-container">
        <table className="rounded-images-table">
                <tr>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[0]} alt="Home Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[1]} alt="Home2 Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[2]} alt="Share Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[3]} alt="New Recipe View" width="300"/>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[4]} alt="New2 Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[5]} alt="Detail Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[6]} alt="Detail2 Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={RecipeRealmScreenshots[7]} alt="Edit Recipe View" width="300"/>
                  </td>
                </tr>
              </table>
      </div>
    </div>
  );
};

export default RecipeRealm;