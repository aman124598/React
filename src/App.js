import React from 'react';
import './App.css';

import { Navbar, Brand, CTA, Hero3D } from './components';
import { WhatGPT3, Features, Possibility, Blog, Footer } from './containers';

function App() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Hero3D />
      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;

