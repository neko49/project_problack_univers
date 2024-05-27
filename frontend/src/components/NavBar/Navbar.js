import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../media/logo/logo_problacku_transparent.png';
import './Navbar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logoImage} alt="PRO BLACK UNIVERS Logo" height="60"/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link to="/about" className="nav-link">Qui sommes-nous?</Link></li>
            <li className="nav-item"><Link to="/boutique" className="nav-link">Nos Entreprises</Link></li>
            <li className="nav-item"><Link to="/news" className="nav-link">Nos News</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
            {isAuthenticated ? (
              <li className="nav-item"><button className="nav-link btn btn-link" onClick={handleLogout}>Déconnexion</button></li>
            ) : (
              <>
                <li className="nav-item"><Link to="/signup" className="nav-link">Inscription</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Connexion</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
