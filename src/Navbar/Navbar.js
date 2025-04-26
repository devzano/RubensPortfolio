import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Home_Icon from '../Projects/CodingLogos/home-icon.png';
import AllProjects_Icon from '../Projects/CodingLogos/all-projects.png';
import Watchlistr_Icon from '../Projects/CodingLogos/watchlistr(icon).png';
import RecipeRealm_Icon from '../Projects/CodingLogos/reciperealm(icon).png';
import EchoExpense_Icon from '../Projects/CodingLogos/echoexpense(icon).png';
import OtakuHive_Icon from '../Projects/CodingLogos/otakuhive(icon).png';
import SunshineKeyWestChallenge_Icon from '../Projects/CodingLogos/sunshinekeywestchallenge(icon).png';
import StarshipPixelscape_Icon from '../Projects/CodingLogos/starship-pixelscape(icon).png';
import AutoArchive_Icon from '../Projects/CodingLogos/autoarchive(icon).png';

const Navbar = ({ onTogglePause }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="vertical-navbar-container" ref={menuRef}>
      <button
        className="pause-button"
        onClick={onTogglePause}
        title="Pause Animation"
      >
        𐫰
      </button>

      <button
        className={`hamburger-icon ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <div className="vertical-navbar">
          <div className="navbar-links">
            <Link to="/" className="nav-icon" title="Home" onClick={handleNavClick}>
              <img src={Home_Icon} alt="Home" />
            </Link>

            <div className="nav-section-label">Web</div>
            <Link to="/watchlistr-web" className="nav-icon" title="Watchlistr Web" onClick={handleNavClick}>
              <img src={Watchlistr_Icon} alt="Watchlistr Web" />
            </Link>

            <div className="nav-section-label">Mobile</div>
            <Link to="/watchlistr-mobile" className="nav-icon" title="Watchlistr Mobile" onClick={handleNavClick}>
              <img src={Watchlistr_Icon} alt="Watchlistr Mobile" />
            </Link>
            <Link to="/reciperealm" className="nav-icon" title="RecipeRealm" onClick={handleNavClick}>
              <img src={RecipeRealm_Icon} alt="RecipeRealm" />
            </Link>
            <Link to="/echoexpense" className="nav-icon" title="EchoExpense" onClick={handleNavClick}>
              <img src={EchoExpense_Icon} alt="EchoExpense" />
            </Link>
            <Link to="/otakuhive" className="nav-icon" title="OtakuHive" onClick={handleNavClick}>
              <img src={OtakuHive_Icon} alt="OtakuHive" />
            </Link>
            <Link to="/starship-pixelscape" className="nav-icon" title="Pixelscape" onClick={handleNavClick}>
              <img src={StarshipPixelscape_Icon} alt="Pixelscape" />
            </Link>
            <Link to="/autoarchive" className="nav-icon" title="AutoArchive" onClick={handleNavClick}>
              <img src={AutoArchive_Icon} alt="AutoArchive" />
            </Link>
            <Link to="/sunshinekeywestchallenge" className="nav-icon" title="SKWC" onClick={handleNavClick}>
              <img src={SunshineKeyWestChallenge_Icon} alt="SKWC" />
            </Link>

            <Link to="/projects" className="nav-icon" title="All Projects" onClick={handleNavClick}>
              <img src={AllProjects_Icon} alt="All Projects" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;