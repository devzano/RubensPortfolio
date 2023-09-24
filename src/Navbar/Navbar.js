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
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li>
              <span onClick={() => setWebDropdownOpen(!isWebDropdownOpen)}>Web</span>
              {isWebDropdownOpen && (
                <ul>
                  <li><Link to="/watchlistr-web" onClick={() => setIsOpen(false)}>Watchlistr</Link></li>
                </ul>
              )}
            </li>
            <li>
              <span onClick={() => setMobileDropdownOpen(!isMobileDropdownOpen)}>iOS</span>
              {isMobileDropdownOpen && (
                <ul>
                  <li><Link to="/reciperealm" onClick={() => setIsOpen(false)}>RecipeRealm</Link></li>
                  <li><Link to="/watchlistr-ios" onClick={() => setIsOpen(false)}>Watchlistr</Link></li>
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