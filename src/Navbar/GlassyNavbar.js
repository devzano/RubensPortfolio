import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GlassyNavbar.css';
import Watchlistr_Icon from '../Projects/CodingLogos/watchlistr(icon).png';
import RecipeRealm_Icon from '../Projects/CodingLogos/reciperealm(icon).png';
import EchoExpense_Icon from '../Projects/CodingLogos/echoexpense(icon).png';
import OtakuHive_Icon from '../Projects/CodingLogos/otakuhive(icon).png';
import SunshineKeyWestChallenge_Icon from '../Projects/CodingLogos/sunshinekeywestchallenge(icon).png';
import StarshipPixelscape_Icon from '../Projects/CodingLogos/starship-pixelscape(icon).png';
import AutoArchive_Icon from '../Projects/CodingLogos/autoarchive(icon).png';

const GlassyNavbar = ({ onTogglePause }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="glassy-navbar-container" ref={navbarRef}>
      <div
        className={`menu-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
        role="button"
        tabIndex="0"
      >
        <span />
        <span />
        <span />
      </div>

      <button
        className="pause-animation-icon"
        onClick={onTogglePause}
        aria-label="Pause Background Animation"
        title="Pause Background Animation"
      >
        𐫰
      </button>

      <nav className={`glassy-navbar ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={handleNavClick}>
          Home
        </Link>
        <div className="nav-section">
          <span className="nav-label">Web</span>
          <Link to="/watchlistr-web" className="nav-link" onClick={handleNavClick}>
            <img src={Watchlistr_Icon} alt="Watchlistr Icon" />
            Watchlistr
          </Link>
        </div>
        <div className="nav-section">
          <span className="nav-label">Mobile</span>
          <Link to="/watchlistr-mobile" className="nav-link" onClick={handleNavClick}>
            <img src={Watchlistr_Icon} alt="Watchlistr Icon" /> Watchlistr
          </Link>
          <Link to="/reciperealm" className="nav-link" onClick={handleNavClick}>
            <img src={RecipeRealm_Icon} alt="RecipeRealm Icon" /> RecipeRealm
          </Link>
          <Link to="/echoexpense" className="nav-link" onClick={handleNavClick}>
            <img src={EchoExpense_Icon} alt="EchoExpense Icon" /> EchoExpense
          </Link>
          <Link to="/otakuhive" className="nav-link" onClick={handleNavClick}>
            <img src={OtakuHive_Icon} alt="OtakuHive Icon" /> OtakuHive
          </Link>
          <Link to="/starship-pixelscape" className="nav-link" onClick={handleNavClick}>
            <img src={StarshipPixelscape_Icon} alt="Starship Pixelscape Icon" /> Pixelscape
          </Link>
          <Link to="/autoarchive" className="nav-link" onClick={handleNavClick}>
            <img src={AutoArchive_Icon} alt="AutoArchive Icon" /> AutoArchive
          </Link>
          <Link to="/sunshinekeywestchallenge" className="nav-link" onClick={handleNavClick}>
            <img src={SunshineKeyWestChallenge_Icon} alt="Sunshine Challenge Icon" /> SKWC
          </Link>
        </div>
        <Link to="/projects" className="nav-link" onClick={handleNavClick}>
          All Projects
        </Link>
      </nav>
    </div>
  );
};

export default GlassyNavbar;