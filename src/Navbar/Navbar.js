import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWebDropdownOpen, setWebDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (navbarRef.current && !navbarRef.current.contains(ev.target)) {
        setIsOpen(false);
        setWebDropdownOpen(false);
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container" ref={navbarRef}>
      {isOpen ? (
        <div className="navbar">
          <ul className="navbar-list">
            <li><Link className="navbar-link" to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li onMouseEnter={() => setWebDropdownOpen(true)} onMouseLeave={() => setWebDropdownOpen(false)}>
              <span className="navbar-link">Web</span>
              {isWebDropdownOpen && (
                <ul>
                  <li><Link className="navbar-link" to="/watchlistr-web" onClick={() => setIsOpen(false)}>Watchlistr</Link></li>
                </ul>
              )}
            </li>
            <li onMouseEnter={() => setMobileDropdownOpen(true)} onMouseLeave={() => setMobileDropdownOpen(false)}>
              <span className="navbar-link">iOS</span>
              {isMobileDropdownOpen && (
                <ul>
                  <li><Link className="navbar-link" to="/reciperealm" onClick={() => setIsOpen(false)}>RecipeRealm</Link></li>
                  <li><Link className="navbar-link" to="/watchlistr-ios" onClick={() => setIsOpen(false)}>Watchlistr</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-icon" onClick={() => setIsOpen(!isOpen)}>
          &#9776;
        </div>
      )}
    </div>
  );
};

export default Navbar;