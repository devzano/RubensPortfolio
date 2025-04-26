import React, { useEffect } from 'react';
import Projects from '../Projects/Projects';
import './Portfolio.css';

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "React",
  "Swift",
  "Flask",
  "ExpressJS",
  "NodeJS",
  "GIT",
  "PostgresSQL",
  "MySQL",
  "Data Analysis",
  "PHPMyAdmin",
  "Algorithms",
  "UI/UX Design",
  "Debugging",
  "Testing",
  "Full-Stack Developer",
];

const Portfolio = () => {
  useEffect(() => {
    const skillElements = document.querySelectorAll('.skill');
    skillElements.forEach((skill, index) => {
      setTimeout(() => {
        skill.classList.add('skill-typing');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="coding-background">
      <h1 className="title">My Portfolio</h1>
      <div className="project">
        <div className="sections-container">
          <section className="section">
            <h2 className="section-title">About Me</h2>
            <p>
              Motivated and driven, with a passion for software engineering. Currently seeking an entry-level position to acquire valuable experience in the field. Eager to contribute to a team and collaborate towards the attainment of company objectives.
            </p>
            <br/>
            <br/>
            <h2 className="section-title">Contact</h2>
            <p>
              <a href="https://www.linkedin.com/in/rubenmanzano-se/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
            <p>
              <a href="mailto:rmanzano.se@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
              -
              <a href="tel:3053232827" target="_blank" rel="noopener noreferrer">Phone</a>
              -
              <a href="sms:3053232827" target="_blank" rel="noopener noreferrer">Text</a>
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Skills</h2>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={index} className="skill">{skill}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div>
        <Projects />
      </div>
    </div>
  );
};

export default Portfolio;