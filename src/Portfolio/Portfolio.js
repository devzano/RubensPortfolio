import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className="coding-background">
      <h1 className="title">My Portfolio</h1>
      <div className="portfolio">
        <div className="sections-container">
        <section className="section">
          <h2 className="section-title">About Me</h2>
            <p>Motivated and driven, with a passion for software engineering. Currently seeking an entry-level position to acquire valuable experience in the field. Eager to contribute to a team and collaborate towards the attainment of company objectives.</p>
            <br/>
            <br/>
          <h2 className="section-title">Contact</h2>
            <p><a href="https://www.linkedin.com/in/rubenmanzano-se/">LinkedIn</a></p>
            <p><a href="mailto:rmanzano.se@gmail.com">Email</a> - <a href="tel:3053232827">Phone</a> - <a href="sms:3053232827">Text</a></p>
        </section>
        <section className="section">
            <h2 className="section-title">Skills</h2>
            <ul className="skills-list">
              <li className="skill">HTML</li>
              <li className="skill">CSS</li>
              <li className="skill">JavaScript</li>
              <li className="skill">Python</li>
              <li className="skill">React</li>
              <li className="skill">Swift</li>
              <li className="skill">Flask</li>
              <li className="skill">ExpressJS</li>
              <li className="skill">NodeJS</li>
              <li className="skill">GIT</li>
              <li className="skill">PostgresSQL</li>
              <li className="skill">MySQL</li>
              <li className="skill">Data Analysis</li>
              <li className="skill">PHPMyAdmin</li>
              <li className="skill">Algorithms</li>
              <li className="skill">UI/UX Design</li>
              <li className="skill">Debugging</li>
              <li className="skill">Testing</li>
              <li className="skill">Full-Stack Developer</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;