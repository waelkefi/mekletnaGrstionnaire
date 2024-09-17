import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez React Router
import './Landing.css'
import Logo from '../../images/logoi..png'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo-mekletna" />
        </Link>

        <div className="auth-buttons">
          <Link to="/login" className="login-button">
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
