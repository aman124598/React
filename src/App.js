import React from 'react';
import './App.css';

import { Navbar, Brand, CTA } from './components';
import { Header, WhatGPT3, Features, Possibility, Blog, Footer } from './containers';

function App() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
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
