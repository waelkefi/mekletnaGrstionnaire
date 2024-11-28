import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Landing.css';
import Logo from '../../images/logoi..png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Obtient l'objet de localisation pour savoir où nous sommes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour déterminer si un lien est actif
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo-mekletna" />
        </Link>

        <div className="auth-buttons">
          <button onClick={toggleMenu} className="menu-toggle">
            {isMenuOpen ? '✖' : '☰'} {/* Menu Hamburger */}
          </button>
          <div className={`nav-items`}>
            {/* <Link to="/" className='navBarBtnLinks' style={{ fontWeight: isActive('/') ? 'bold' : 'normal' }}>
              Nos Plats
            </Link> */}
            {/* <Link to="/Event" className='navBarBtnLinks' style={{ fontWeight: isActive('/Event') ? 'bold' : 'normal' }}>
              Mekletna Events
            </Link> */}
          </div>
        </div>

      </div>
      <div className={`nav-items-mobile ${isMenuOpen ? 'open' : ''}`}>
        {/* <Link to="/" className='navBarBtnLinks' style={{ fontWeight: isActive('/') ? 'bold' : 'normal' }}>
          Nos Plats
        </Link>
        <Link to="/Event" className='navBarBtnLinks' style={{ fontWeight: isActive('/Event') ? 'bold' : 'normal' }}>
          Mekletna Events
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
