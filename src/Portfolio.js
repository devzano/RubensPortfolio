import React, {useState, useEffect} from 'react';
import './Portfolio.css';
import BetaSignupForm from './BetaSignupForm';

function Portfolio() {
  const watchlistrScreens = [
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/LoginPage.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/PopularMovies.png?raw=true",
    "https://github.com/devzano/Watchlistr-Web/raw/main/React/src/styles/Screenshots/TopRatedTVShows.png?raw=true"
  ];
  const recipeRealmScreens = [
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Home).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Home2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Share).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(New).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(New2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Detail).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Detail2).png?raw=true",
    "https://github.com/devzano/RecipeRealm/raw/main/Screenshots/RecipeRealm%20(Edit).png?raw=true"
  ];

  const [watchlistrIndex, setWatchlistrIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistrIndex((prevIndex) => (prevIndex + 1) % watchlistrScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [watchlistrScreens.length]);
	
	const [showForm, setShowForm] = useState(false);

  return (
    <div className="coding-background">
      <div className="portfolio">
      <h1 className="title">My Portfolio</h1>
        <div className="sections-container">
        <section className="section">
            <h2 className="section-title">About Me</h2>
            <p>Motivated and driven, with a passion for software engineering. Currently seeking an entry-level position to acquire valuable experience in the field. Eager to contribute to a team and collaborate towards the attainment of company objectives.</p>
            <h2 className="section-title">Contact</h2>
            <p><a href="https://www.linkedin.com/in/rubenmanzano-se/">LinkedIn</a></p>
            <p><a href="mailto:rmanzano.se@gmail.com">Email</a> - <a href="tel:3053232827">Phone</a> - <a href="sms:3053232827">Text</a></p>
        </section>
        <section className="section">
            <h2 className="section-title">Skills</h2>
            <ul className="skills-list">
              <li className="skill">HTML</li>
              <li className="skill">CSS</li>
              <li className="skill">Javascript</li>
              <li className="skill">Python</li>
              <li className="skill">React</li>
              <li className="skill">Flask</li>
              <li className="skill">GIT</li>
              <li className="skill">PostgresSQL</li>
              <li className="skill">Data Analysis</li>
              <li className="skill">API Development</li>
              <li className="skill">Algorithms</li>
              <li className="skill">Debugging</li>
              <li className="skill">Testing</li>
              <li className="skill">Backend</li>
              <li className="skill">Frontend</li>
              <li className="skill">Full-Stack</li>
              <li className="skill">iOS Development</li>
              <li className="skill">UI/UX Design</li>
            </ul>
          </section>
        </div>
        <section className="section">
          <h2 className="section-title">Projects</h2>
          <div className="centered-content">
            <a href="https://watchlistr-web.vercel.app" target="_blank" rel="noopener noreferrer">Watchlistr</a>
            <div className="project-image-container">
            <img src={watchlistrScreens[watchlistrIndex]} alt={`Project ${watchlistrIndex + 1}`}  className="project-image" style={{ width: '100%', maxHeight: '500px' }} />
            </div>
          </div>
          <div className="centered-content">
              <a href="https://apps.apple.com/us/app/reciperealm/id6458877177" target="_blank" rel="noopener noreferrer">RecipeRealm</a>
	<button onClick={() => setShowForm(!showForm)}>Sign Up for Beta Testing</button>{showForm && <BetaSignupForm />}
            <div className="project-image-container">
              <table className="rounded-images-table">
                <tr>
                  <td align="center">
                    <img src={recipeRealmScreens[0]} alt="Home Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={recipeRealmScreens[1]} alt="Home2 Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={recipeRealmScreens[2]} alt="Share Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={recipeRealmScreens[3]} alt="New Recipe View" width="300"/>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <img src={recipeRealmScreens[4]} alt="New2 Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={recipeRealmScreens[5]} alt="Detail Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={recipeRealmScreens[6]} alt="Detail2 Recipe View" width="300"/>
                  </td>
                  <td align="center">
                    <img src={recipeRealmScreens[7]} alt="Edit Recipe View" width="300"/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
