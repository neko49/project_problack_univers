import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <h4>Contact</h4>
            <ul className="list-unstyled">
              <li><a href="mailto:contact@problacku.com" className="text-white">contact@problacku.com</a></li>
              <li><a href="tel:+33123456789" className="text-white">+33 1 23 45 67 89</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">A Propos</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
              <li><a href="/contact" className="text-white">Contactez nous</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/PROBLACKUNIVERS" target="_blank" rel="noopener noreferrer" className="text-white mr-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/problackunivers/" target="_blank" rel="noopener noreferrer" className="text-white mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/problack-univers-b42979282" target="_blank" rel="noopener noreferrer" className="text-white mr-2">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="col-md-3">
            <h4>FAQs</h4>
            <ul className="list-unstyled">
              <li><a href="/faqs" className="text-white">FAQs</a></li>
              <li><a href="/privacy-policy" className="text-white">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-darker text-light text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} PROBLACKUNIVERS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
