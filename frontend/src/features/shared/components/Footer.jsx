import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">LeadHub</h2>
          <p className="footer-description">
            Connecting businesses with high-quality leads. Grow your pipeline with our modern, data-driven generation tools.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li><a href="#services">Our Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-list">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookies">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-list">
            <li>hello@leadhub.com</li>
            <li>+91 (800) 123-4567</li>
            <li>New Delhi, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LeadHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;