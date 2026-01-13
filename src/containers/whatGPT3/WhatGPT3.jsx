import React from 'react';
import './whatGPT3.css';

const WhatGPT3 = () => {
  const features = [
    {
      title: 'Chatbots',
      text: 'We so opinion friends me message as delight. Whole front do of plate heard oh ought.',
    },
    {
      title: 'Knowledgebase',
      text: 'At every tiled on ye defer do. No attention suspected oh difficult.',
    },
    {
      title: 'Education',
      text: 'Entirely led ten humoured greatest and yourself. Besides ye country on observe.',
    },
  ];

  return (
    <section className="whatgpt3" id="whatGPT3">
      <div className="whatgpt3-feature">
        <h1 className="gradient__text">What is GPT-6</h1>
        <div className="whatgpt3-feature-item">
          <div className="gradient-bar" />
          <h3>What is GPT-6?</h3>
          <p>
            We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own.
          </p>
        </div>
      </div>

      <div className="whatgpt3-heading">
        <h1 className="gradient__text">
          The possibilities are beyond your imagination
        </h1>
        <p>Explore The Library</p>
      </div>

      <div className="whatgpt3-container">
        {features.map((feature, index) => (
          <div className="whatgpt3-container-item" key={index}>
            <div className="gradient-bar" />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatGPT3;