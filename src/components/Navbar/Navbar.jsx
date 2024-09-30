import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Navbar.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [activeLink, setActiveLink] = useState('Today');
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    navigate(link);
    setActiveLink(link);
  };

  return (
    <Container className='content fixed-bottom'>
      <div className="row mx-auto">
        <div className="nav-bar col-md-12 mx-auto d-flex justify-content-between align-items-center mb-4">
          <a
            className={activeLink === '' ? 'active' : ''}
            onClick={() => handleLinkClick('')}
            href="#"
          >
            <i className="fas fa-calendar-day"></i>
            {/* Today */}
          </a>
          <a
            className={activeLink === 'Prayers' ? 'active' : ''}
            onClick={() => handleLinkClick('Prayers')}
            href="#"
          >
            <i className="fas fa-pray"></i>
            {/* Prayers */}
          </a>
          <a
            className={activeLink === 'Qalbox' ? 'active' : ''}
            onClick={() => handleLinkClick('Qalbox')}
            href="#"
          >
            <i className="fas fa-play"></i>
            {/* Qalbox */}
          </a>
          <a
            className={activeLink === 'Quran' ? 'active' : ''}
            onClick={() => handleLinkClick('Quran')}
            href="#"
          >
            <i className="fas fa-book"></i>
            {/* Quran */}
          </a>
          <a
            className={activeLink === 'Profile' ? 'active' : ''}
            onClick={() => handleLinkClick('Profile')}
            href="#"
          >
            <i className="fas fa-user"></i>
            {/* Profile */}
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
