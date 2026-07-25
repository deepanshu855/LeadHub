import React from "react";
import { Sparkles, LayoutDashboard } from "lucide-react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          {/* Left Side: Brand & Description */}
          <div className="footer-brand-info">
            <div className="footer-brand">
              <LayoutDashboard size={18} />
              <h2 className="footer-logo">LeadHub</h2>
            </div>
            <p className="footer-description">
              Helping businesses capture and manage leads efficiently.
            </p>
          </div>

          {/* Right Side: Required Badge */}
          <a
            href="https://digitalheroesco.com/"
            target="_blank"
            className="footer-badge-wrapper"
          >
            <div className="footer-badge">
              <Sparkles size={14} className="badge-icon" />
              <span>Built for Digital Heroes Training Task</span>
            </div>
          </a>
        </div>

        {/* Bottom: Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2026 LeadHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
