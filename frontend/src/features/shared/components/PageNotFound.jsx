import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSearch, Home } from "lucide-react";
import "../styles/pagenotfound.css";

const PageNotFound = () => {
  return (
    <div className="notfound-wrapper">
      <motion.div
        className="notfound-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="notfound-icon-wrapper">
          <FileSearch size={40} className="notfound-icon" />
        </div>

        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page not found</h2>

        <p className="notfound-text">
          The page you are looking for doesn't exist, has been removed, or is
          temporarily unavailable.
        </p>

        <div className="notfound-actions">
          <NavLink to="/" className="btn-primary notfound-btn">
            <Home size={18} />
            Back to Home
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
