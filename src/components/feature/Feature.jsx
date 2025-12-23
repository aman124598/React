import React from 'react';
import './feature.css';

const Feature = ({ title, text }) => {
  return (
    <div className="feature-item">
      <div className="feature-line" />
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Feature;