import React from 'react';
import './Footer.css'; // Ensure you have the CSS file linked
import logo from '../assets/the2px-logo.svg'; // Corrected import path

const Footer = () => {
  return (
    <footer className="footer d-flex justify-content-between align-items-center p-2">
      {/* Logo on the left side */}
      <div className="footer-logo">
        <img src={logo} alt="Logo" height="40" />
      </div>
      

      {/* Rights text on the right side */}
      <div className="footer-rights">
        <p>© 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
