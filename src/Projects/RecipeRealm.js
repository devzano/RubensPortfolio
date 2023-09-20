import React, {useState, useEffect} from 'react';

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
    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % 2);
    }, 4000);
    return () => clearInterval(interval)
  }, []);

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
              {[0, 1, 2, 3].map(i => (
                <td align="center" key={i}>
                  <img src={RecipeRealmScreenshots[i + currentSet * 4]} alt={`RecipeRealm View ${i + currentSet * 4}`} width="300"/>
                </td>
              ))}
          </tr>
        </table>
      </div>
    </div>
  );
};

export default RecipeRealm;