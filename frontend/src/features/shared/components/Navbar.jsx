import React, { useState } from 'react';
import '../styles/nav.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <a href="/">LeadHub</a>
        </div>

        {/* Desktop Navigation */}
        <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
          
          {/* Mobile CTA (Shows only in mobile menu) */}
          <a href="#quote" className="nav-cta-mobile">Get a Quote</a>
        </nav>

        {/* Desktop CTA Button */}
        <div className="navbar-actions">
          <a href="#quote" className="btn-primary">Get a Quote</a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="hamburger-menu" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;