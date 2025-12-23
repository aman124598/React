import React from 'react';
import './footer.css';
import gpt3Logo from '../../assets/GPT-3.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-heading">
        <h1 className="gradient__text">
          Do you want to step in to the future before others
        </h1>
      </div>

      <div className="footer-btn">
        <button type="button">Request Early Access</button>
      </div>

      <div className="footer-links">
        <div className="footer-links-logo">
          <img src={gpt3Logo} alt="GPT-3 Logo" />
          <p>
            Crechterwoord K12 182 DK Alknjkcb, All Rights Reserved
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <span>f</span>
            </a>
            <a href="#" aria-label="Twitter">
              <span>𝕏</span>
            </a>
            <a href="#" aria-label="LinkedIn">
              <span>in</span>
            </a>
            <a href="#" aria-label="Instagram">
              <span>📷</span>
            </a>
          </div>
        </div>

        <div className="footer-links-column">
          <h4>Links</h4>
          <a href="#">Overons</a>
          <a href="#">Social Media</a>
          <a href="#">Counters</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-links-column">
          <h4>Company</h4>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-links-column">
          <h4>Get in touch</h4>
          <a href="#">Crechterwoord K12 182 DK Alknjkcb</a>
          <a href="tel:085-132567">085-132567</a>
          <a href="mailto:info@payme.net">info@payme.net</a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2024 GPT-3. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;