import React, { useState, useEffect, useRef, useMemo } from 'react';
import ThreeScene from './ThreeScene';
import './ThreeScene.css';
import people from '../../assets/Group 81.png';
import ai from '../../assets/Illustration.png';

// Floating CSS particles for additional depth
const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 15,
    }));
  }, []);

  return (
    <div className="particles-overlay">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const Hero3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
        setScrollProgress(scrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="hero-3d" ref={heroRef} id="home">
      {/* Floating Particles Overlay - Background */}
      <FloatingParticles />
      
      {/* Main Content Container */}
      <div className="hero-3d-content">
        {/* Left Side: Text Content */}
        <div className="hero-3d-text">
          <h1>
            Let's Build Something <br />
            <span className="highlight">Amazing with GPT-6</span> <br />
            OpenAI
          </h1>
          
          <p>
            Experience the future of artificial intelligence. Our cutting-edge 
            GPT-6 solutions transform the way businesses operate, delivering 
            unprecedented automation and insights that drive growth.
          </p>
          
          <div className="hero-3d-cta">
            <input 
              type="email" 
              placeholder="Your Email Address"
              aria-label="Email address for early access"
            />
            <button type="button">Get Started</button>
          </div>
          
          <div className="hero-stats">
            <div className="hero-stats-avatars">
              <img src={people} alt="User profiles" />
            </div>
            <div className="hero-stats-text">
              <strong>1,600+ people</strong>
              <span>requested access in last 24 hours</span>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Illustration */}
        <div className="hero-3d-canvas">
          <ThreeScene scrollProgress={scrollProgress} />
          <img src={ai} alt="AI Illustration" className="hero-ai-illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
