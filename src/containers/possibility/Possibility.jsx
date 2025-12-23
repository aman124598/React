import React from 'react';
import './possibility.css';
import featureImage from '../../assets/Feature Image.png';

const Possibility = () => {
  return (
    <section className="possibility" id="possibility">
      <div className="possibility-image">
        <img src={featureImage} alt="AI Possibilities" />
      </div>
      
      <div className="possibility-content">
        <span className="tag">Request Early Access to Get Started</span>
        <h1 className="gradient__text">
          The possibilities are beyond your imagination
        </h1>
        <p>
          Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.
        </p>
        <span className="cta-text">Request Early Access to Get Started</span>
      </div>
    </section>
  );
};

export default Possibility;