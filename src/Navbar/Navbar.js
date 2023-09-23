import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (navbarRef.current && !navbarRef.current.contains(ev.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container" onClick={() => setIsOpen(!isOpen)} ref={navbarRef} >
      {isOpen ? (
        <div className="navbar">
          <ul className="navbar-list">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
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