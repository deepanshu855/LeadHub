import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/nav.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Add subtle shadow on scroll (SaaS standard)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
            <div className="logo-icon">
              <LayoutDashboard size={18} />
            </div>
            LeadHub
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-links desktop-only">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="nav-link"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="nav-link"
          >
            Features
          </a>
          <a
            href="#trust"
            onClick={(e) => scrollToSection(e, "trust")}
            className="nav-link"
          >
            Why Us
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-link"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mobile-menu"
          >
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="mobile-link"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="mobile-link"
            >
              Features
            </a>
            <a
              href="#trust"
              onClick={(e) => scrollToSection(e, "trust")}
              className="mobile-link"
            >
              Why Us
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="mobile-link"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
