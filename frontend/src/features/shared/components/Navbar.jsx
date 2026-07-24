import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to apply the active class dynamically
  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <NavLink to="/">LeadHub</NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`navbar-links ${isMobileMenuOpen ? "mobile-active" : ""}`}
        >
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>

          {/* Mobile CTA */}
          <NavLink to="/quote" className="nav-cta-mobile">
            Get a Quote
          </NavLink>
        </nav>

        {/* Desktop CTA Button */}
        <div className="navbar-actions">
          <NavLink to="/quote" className="btn-primary">
            Get a Quote
          </NavLink>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className={`bar ${isMobileMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${isMobileMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${isMobileMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
