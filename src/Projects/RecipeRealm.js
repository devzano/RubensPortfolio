import React, {useState, useEffect} from 'react';
import '../Portfolio/Portfolio.css';
import '../Projects/Projects.css';

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

  return (
    <div className="coding-background">
      <h1 className="title">
        <a href="https://apps.apple.com/us/app/reciperealm/id6458877177" target="_blank" rel="noopener noreferrer" className="section-title link-font">RecipeRealm</a>
      </h1>
      <div className="centered-content">
        <button onClick={handleBetaButtonClick}
          className="beta-button">Beta Testing</button>
        <div className="project">
          <div className="sections-container">
            <div className="section">
              <div className="project-image-container">
              <table className="rounded-images-table">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeRealm;