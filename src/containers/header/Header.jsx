import React from 'react';
import './header.css';
import group from '../../assets/Group 81.png';
import illustration from '../../assets/Illustration.png';

const Header = () => {
  return (
    <header className="header" id="home">
      <div className="header-content">
        <h1 className="gradient__text">
          Let's Build Something Amazing with GPT-3 OpenAI
        </h1>
        <p>
          Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.
        </p>
        
        <div className="header-input">
          <input 
            type="email" 
            placeholder="Your Email Address" 
          />
          <button type="button">Get Started</button>
        </div>
        
        <div className="header-signup">
          <img src={group} alt="People who requested access" />
          <p>1,600 people requested access in the last 24 hours</p>
        </div>
      </div>
      
      <div className="header-image">
        <img src={illustration} alt="AI Illustration" />
      </div>
    </header>
  );
};

export default Header;