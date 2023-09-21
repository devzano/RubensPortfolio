import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar-container" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? (
        <div className="navbar">
          <ul className="navbar-list">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          </ul>
        </div>
      ) : (
        <div className="navbar-icon">&#9776;</div>
      )}
    </div>
  );
};

export default Navbar;