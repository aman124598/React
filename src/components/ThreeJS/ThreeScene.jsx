import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Animated Particle Sphere Component
const ParticleSphere = ({ scrollProgress }) => {
  const points = useRef();
  const [hovered, setHovered] = useState(false);
  
  const particleCount = 3000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.5 + Math.random() * 0.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Gradient colors - purple to orange
      const t = Math.random();
      colors[i * 3] = 0.68 + t * 0.27;     // R: purple to orange
      colors[i * 3 + 1] = 0.41 - t * 0.12; // G
      colors[i * 3 + 2] = 0.98 - t * 0.58; // B
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (points.current) {
      points.current.rotation.y = time * 0.1;
      points.current.rotation.x = Math.sin(time * 0.05) * 0.2;
      
      // Scale based on scroll
      const scale = 1 + scrollProgress * 0.5;
      points.current.scale.setScalar(scale);
      
      // Morph particles on hover
      const geometry = points.current.geometry;
      const positionAttr = geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        const noise = Math.sin(time * 2 + i * 0.01) * (hovered ? 0.3 : 0.1);
        
        positionAttr.array[i3] = x + noise;
        positionAttr.array[i3 + 1] = y + Math.cos(time + i * 0.01) * 0.1;
        positionAttr.array[i3 + 2] = z + noise;
      }
      positionAttr.needsUpdate = true;
    }
  });
  
  return (
    <points 
      ref={points}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Floating Geometric Shapes
const FloatingShape = ({ geometry, position, color, speed = 1, distort = 0.3 }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.2 * speed;
    mesh.current.rotation.y = time * 0.3 * speed;
  });
  
  return (
    <Float 
      speed={2 * speed} 
      rotationIntensity={1.5} 
      floatIntensity={2}
    >
      <mesh ref={mesh} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Neural Network Lines
const NeuralLines = ({ scrollProgress }) => {
  const linesRef = useRef();
  const lineCount = 50;
  
  const [linePositions] = useMemo(() => {
    const positions = [];
    
    for (let i = 0; i < lineCount; i++) {
      const startTheta = Math.random() * Math.PI * 2;
      const startPhi = Math.acos(2 * Math.random() - 1);
      const endTheta = Math.random() * Math.PI * 2;
      const endPhi = Math.acos(2 * Math.random() - 1);
      
      const radius = 2.5;
      
      positions.push({
        start: new THREE.Vector3(
          radius * Math.sin(startPhi) * Math.cos(startTheta),
          radius * Math.sin(startPhi) * Math.sin(startTheta),
          radius * Math.cos(startPhi)
        ),
        end: new THREE.Vector3(
          radius * Math.sin(endPhi) * Math.cos(endTheta),
          radius * Math.sin(endPhi) * Math.sin(endTheta),
          radius * Math.cos(endPhi)
        )
      });
    }
    
    return [positions];
  }, []);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group ref={linesRef}>
      {linePositions.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.start.x, line.start.y, line.start.z,
                line.end.x, line.end.y, line.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={i % 2 === 0 ? "#ae67fa" : "#f49867"} 
            transparent 
            opacity={0.2 + scrollProgress * 0.3}
          />
        </line>
      ))}
    </group>
  );
};

// Glowing Core Sphere
const GlowingCore = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
  });
  
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#ae67fa"
        emissive="#ae67fa"
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Mouse-following light
const MouseLight = () => {
  const light = useRef();
  const { pointer, viewport } = useThree();
  
  useFrame(() => {
    light.current.position.x = pointer.x * viewport.width * 0.5;
    light.current.position.y = pointer.y * viewport.height * 0.5;
  });
  
  return (
    <pointLight ref={light} color="#f49867" intensity={1} distance={8} />
  );
};

// Main Scene Component
const Scene = ({ scrollProgress }) => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ae67fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f49867" />
      <MouseLight />
      
      {/* Main particle sphere */}
      <ParticleSphere scrollProgress={scrollProgress} />
      
      {/* Neural connection lines */}
      <NeuralLines scrollProgress={scrollProgress} />
      
      {/* Glowing core */}
      <GlowingCore />
      
      {/* Floating geometric shapes around the main sphere */}
      <FloatingShape 
        geometry={<icosahedronGeometry args={[0.4, 0]} />}
        position={[4, 2, -2]}
        color="#ae67fa"
        speed={0.8}
      />
      <FloatingShape 
        geometry={<octahedronGeometry args={[0.35, 0]} />}
        position={[-4, 1, -1]}
        color="#f49867"
        speed={1.2}
      />
      <FloatingShape 
        geometry={<torusGeometry args={[0.3, 0.1, 16, 32]} />}
        position={[3, -2, 1]}
        color="#ff4820"
        speed={0.6}
      />
      <FloatingShape 
        geometry={<dodecahedronGeometry args={[0.3, 0]} />}
        position={[-3, -1.5, 2]}
        color="#81afdd"
        speed={1}
      />
      <FloatingShape 
        geometry={<boxGeometry args={[0.4, 0.4, 0.4]} />}
        position={[5, -1, -3]}
        color="#ae67fa"
        speed={0.7}
        distort={0.2}
      />
    </>
  );
};

// Main Three Scene Export
const ThreeScene = ({ scrollProgress = 0 }) => {
  return (
    <div className="three-scene-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto'
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
