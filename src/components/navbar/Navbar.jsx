import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../assets/GPT-3.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <nav className={`navbar ${isScrolled ? "glass" : ""}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <img src={logo} alt="GPT-6 Logo" />
        </a>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#whatGPT3">What is GPT-6?</a>
          <a href="#features">Features</a>
          <a href="#possibility">Open AI</a>
          <a href="#blog">Case Studies</a>
        </div>

        <div className="navbar-auth">
          <button className="btn-signin">Sign in</button>
          <button className="btn-signup">Sign up</button>
        </div>

        <div
          className={`navbar-menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <a href="#home" onClick={closeMenu}>
          Home
        </a>
        <a href="#whatGPT3" onClick={closeMenu}>
          What is GPT-6?
        </a>
        <a href="#features" onClick={closeMenu}>
          Features
        </a>
        <a href="#possibility" onClick={closeMenu}>
          Open AI
        </a>
        <a href="#blog" onClick={closeMenu}>
          Case Studies
        </a>

        <div className="navbar-mobile-auth">
          <button className="btn-signin" onClick={closeMenu}>
            Sign in
          </button>
          <button className="btn-signup" onClick={closeMenu}>
            Sign up
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`navbar-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />
    </nav>
  );
};

export default Navbar;
