import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Scroll-based reveal animation component
export const ScrollReveal = ({ 
  children, 
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  stagger = 0.1 
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, isVisible]);
  
  useEffect(() => {
    if (isVisible && ref.current) {
      const el = ref.current;
      
      const animations = {
        fadeUp: {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0 }
        },
        fadeDown: {
          from: { opacity: 0, y: -50 },
          to: { opacity: 1, y: 0 }
        },
        fadeLeft: {
          from: { opacity: 0, x: -50 },
          to: { opacity: 1, x: 0 }
        },
        fadeRight: {
          from: { opacity: 0, x: 50 },
          to: { opacity: 1, x: 0 }
        },
        scale: {
          from: { opacity: 0, scale: 0.8 },
          to: { opacity: 1, scale: 1 }
        },
        rotate: {
          from: { opacity: 0, rotation: -10, y: 30 },
          to: { opacity: 1, rotation: 0, y: 0 }
        }
      };
      
      const { from, to } = animations[animation] || animations.fadeUp;
      
      gsap.fromTo(
        el,
        from,
        {
          ...to,
          duration,
          delay,
          ease: 'power3.out'
        }
      );
    }
  }, [isVisible, animation, delay, duration]);
  
  const initialStyle = {
    opacity: 0
  };
  
  return (
    <div ref={ref} style={isVisible ? {} : initialStyle}>
      {children}
    </div>
  );
};

// Parallax effect hook
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distance = elementCenter - viewportCenter;
        
        setOffset(distance * speed);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return { ref, offset };
};

// Magnetic cursor effect component
export const MagneticElement = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    };
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);
  
  return <div ref={ref}>{children}</div>;
};

// Text scramble effect
export const TextScramble = ({ text, trigger = true, duration = 1000 }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    if (!trigger) return;
    
    let iteration = 0;
    const originalText = text;
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iteration += 1 / 3;
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
    }, duration / (originalText.length * 3));
    
    return () => clearInterval(interval);
  }, [trigger, text, duration]);
  
  return <span>{displayText}</span>;
};

// Smooth counter animation
export const AnimatedCounter = ({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [started]);
  
  useEffect(() => {
    if (!started) return;
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const tick = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      setCount(Math.floor(easeProgress * value));
      
      if (now < endTime) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(tick);
  }, [started, value, duration]);
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default ScrollReveal;
