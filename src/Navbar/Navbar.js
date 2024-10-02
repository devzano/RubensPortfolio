import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Watchlistr_Icon from '../Projects/CodingLogos/watchlistr(icon).png';
import RecipeRealm_Icon from '../Projects/CodingLogos/reciperealm(icon).png';
import EchoExpense_Icon from '../Projects/CodingLogos/echoexpense(icon).png';
import OtakuHive_Icon from '../Projects/CodingLogos/otakuhive(icon).png';

const Navbar = ({ onTogglePause }) => {
  const [state, setState] = useState({
    isOpen: false,
    activeDropdown: null,
  });
  const navbarRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  }, []);

  const handleMouseEnter = useCallback((dropdown) => {
    setState((prevState) => ({ ...prevState, activeDropdown: dropdown }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState((prevState) => ({ ...prevState, activeDropdown: null }));
  }, []);

  const handleClickOutside = useCallback((ev) => {
    if (navbarRef.current && !navbarRef.current.contains(ev.target)) {
      setState({ isOpen: false, activeDropdown: null });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action();
    }
  };

  return (
    <div className="navbar-container" ref={navbarRef}>
      <div className="navbar-icon-container">
        <div
          className="navbar-icon"
          onClick={toggleMenu}
          onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
          tabIndex="0"
          role="button"
          aria-label="Toggle Menu"
        >
          &#9776;
        </div>
      </div>

      <button
        className="pause-animation-icon"
        onClick={onTogglePause}
        aria-label="Pause Background Animation"
        title="Pause Background Animation"
      >
        𐫰
      </button>

      {state.isOpen && (
        <div className="navbar">
          <div className="navbar-list">
            <Link
              className="navbar-link"
              to="/"
              onClick={toggleMenu}
              onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
              role="menuitem"
              tabIndex="0"
            >
              Home
            </Link>
            <div
              className={`navbar-dropdown ${state.activeDropdown === 'web' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('web')}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleMouseEnter('web')}
              tabIndex="0"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={state.activeDropdown === 'web'}
              onKeyDown={(e) => handleKeyDown(e, () => handleMouseEnter('web'))}
            >
              <span className="navbar-link">Web</span>
              {state.activeDropdown === 'web' && (
                <div className="dropdown">
                  <Link
                    className="navbar-link"
                    to="/watchlistr-web"
                    onClick={toggleMenu}
                    onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                    role="menuitem"
                    tabIndex="0"
                  >
                    Watchlistr
                    <img src={Watchlistr_Icon} alt="Watchlistr Icon" className="navbar-icon-img" />
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`navbar-dropdown ios ${state.activeDropdown === 'ios' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('ios')}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleMouseEnter('ios')}
              tabIndex="0"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={state.activeDropdown === 'ios'}
              onKeyDown={(e) => handleKeyDown(e, () => handleMouseEnter('ios'))}
            >
              <span className="navbar-link">iOS</span>
              {state.activeDropdown === 'ios' && (
                <div className="dropdown">
                  <Link
                    className="navbar-link"
                    to="/watchlistr-ios"
                    onClick={toggleMenu}
                    onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                    role="menuitem"
                    tabIndex="0"
                  >
                    Watchlistr
                    <img src={Watchlistr_Icon} alt="Watchlistr Icon" className="navbar-icon-img" />
                  </Link>
                  <Link
                    className="navbar-link"
                    to="/reciperealm"
                    onClick={toggleMenu}
                    onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                    role="menuitem"
                    tabIndex="0"
                  >
                    RecipeRealm
                    <img src={RecipeRealm_Icon} alt="RecipeRealm Icon" className="navbar-icon-img" />
                  </Link>
                  <Link
                    className="navbar-link"
                    to="/echoexpense"
                    onClick={toggleMenu}
                    onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                    role="menuitem"
                    tabIndex="0"
                  >
                    EchoExpense
                    <img src={EchoExpense_Icon} alt="EchoExpense Icon" className="navbar-icon-img" />
                  </Link>
                  <Link
                    className="navbar-link"
                    to="/otakuhive"
                    onClick={toggleMenu}
                    onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                    role="menuitem"
                    tabIndex="0"
                  >
                    OtakuHive
                    <img src={OtakuHive_Icon} alt="OtakuHive Icon" className="navbar-icon-img" />
                  </Link>
                </div>
              )}
            </div>
            <Link
              className="navbar-link"
              to="/projects"
              onClick={toggleMenu}
              onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
              role="menuitem"
              tabIndex="0"
            >
              All Projects
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Navbar);