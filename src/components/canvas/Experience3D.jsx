"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Float, Text3D, Center, useScroll, MeshDistortMaterial } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import WavyProfileImage from './WavyProfileImage';

// A component to move the camera based on scroll
function CameraRig() {
  const scroll = useScroll();
  
  useFrame((state) => {
    // scroll.offset goes from 0 to 1
    // We want to move the camera forward (negative Z) as we scroll
    const zPos = -scroll.offset * 100; // Move 100 units deep
    
    // Smoothly interpolate camera position
    state.camera.position.lerp(new THREE.Vector3(0, 0, zPos + 10), 0.1);
    
    // Optional: add a slight rotation or wobble based on scroll
    state.camera.rotation.z = Math.sin(scroll.offset * Math.PI) * 0.05;
  });

  return null;
}

// 3D Objects scattered in space
function TechObject({ position, color, scale, speed = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={mesh} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial color={color} wireframe distort={0.3} speed={2} />
      </mesh>
    </Float>
  );
}

// The main HTML overlay content tied to scroll
function HTMLContent() {
  return (
    <Scroll html style={{ width: '100%', height: '100%' }}>
      {/* Section 1: Hero (z = 0) */}
      <div className="w-screen h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-gradient uppercase">
          Ali Zohaib
        </h1>
        <h2 className="text-2xl md:text-4xl text-gray-300 font-light mb-6">
          Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-[#D32F2F] tracking-widest uppercase mb-12">
          Artificial Intelligence & Robotics Graduate
        </p>
        <div className="animate-bounce">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Scroll to Explore</p>
          <div className="w-px h-16 bg-gradient-to-b from-[#D32F2F] to-transparent mx-auto" />
        </div>
      </div>

      {/* Section 2: About (z = roughly -20) */}
      <div className="w-screen h-screen flex items-center justify-start px-10 md:px-32">
        <div className="max-w-2xl glassmorphism p-10 rounded-3xl mt-32">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white uppercase tracking-wider">
            About <span className="text-[#D32F2F]">Me</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            I transform complex problems into elegant digital solutions. With a deep foundation in AI and Robotics, I engineer scalable backends and immersive frontend experiences.
          </p>
          <p className="text-lg text-gray-400">
            Based in Lahore, Pakistan. Bridging the gap between intelligent algorithms and beautiful user interfaces.
          </p>
        </div>
      </div>

      {/* Section 3: Skills (z = roughly -40) */}
      <div className="w-screen h-screen flex items-center justify-end px-10 md:px-32">
        <div className="max-w-xl glassmorphism p-10 rounded-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white uppercase tracking-wider text-right">
            Core <span className="text-[#D32F2F]">Skills</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: 'React / Next.js', level: 'Expert' },
              { name: 'Node.js / Express', level: 'Expert' },
              { name: 'Three.js / WebGL', level: 'Advanced' },
              { name: 'Python / AI', level: 'Advanced' },
              { name: 'MongoDB', level: 'Expert' },
              { name: 'System Architecture', level: 'Advanced' },
            ].map(skill => (
              <div key={skill.name} className="border-b border-white/10 pb-4">
                <h3 className="text-white font-bold mb-1">{skill.name}</h3>
                <p className="text-[#D32F2F] text-sm tracking-widest uppercase">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Projects & Experience (z = roughly -60) */}
      <div className="w-screen h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center mt-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 text-white uppercase tracking-wider">
            Experience & <span className="text-[#D32F2F]">Projects</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            From developing autonomous robotics to engineering high-performance web applications.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/projects" className="px-8 py-4 bg-[#D32F2F] hover:bg-red-700 text-white rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(211,47,47,0.4)]">
              View All Projects
            </a>
            <a href="/experience" className="px-8 py-4 glassmorphism text-white rounded-full font-bold transition-all hover:scale-105 hover:bg-white/10">
              View Experience Timeline
            </a>
          </div>
        </div>
      </div>

      {/* Section 5: Contact & Final Reveal (z = roughly -80 to -100) */}
      <div className="w-screen min-h-screen flex flex-col items-center justify-between pt-32 pb-10 px-6 relative pointer-events-none">
        
        {/* Contact Top */}
        <div className="flex flex-col items-center justify-center w-full pointer-events-auto">
          <h2 className="text-5xl md:text-8xl font-bold mb-4 text-white uppercase tracking-wider text-center">
            Let's <span className="text-[#D32F2F]">Connect</span>
          </h2>
          <a href="mailto:hello@alizohaib.com" className="text-2xl md:text-4xl text-gray-300 hover:text-white border-b-2 border-[#D32F2F] pb-1 transition-colors">
            hello@alizohaib.com
          </a>
        </div>

        {/* Text next to the 3D Image (Image is at z=-100) */}
        <div className="flex-grow flex items-center w-full max-w-7xl mx-auto pointer-events-none mt-20">
          <div className="w-full md:w-1/2 ml-auto text-right md:pr-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-wider drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-tight">
              FULL-STACK <br/><span className="text-[#D32F2F]">DEVELOPER</span>
            </h2>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="w-full text-center mt-10 pointer-events-auto">
          <p className="text-sm text-gray-500 tracking-widest uppercase font-medium">
            © {new Date().getFullYear()} Zohaib. All rights reserved.
          </p>
        </footer>
      </div>
    </Scroll>
  );
}

export default function Experience3D() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#D32F2F" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        
        <Environment preset="city" />

        {/* ScrollControls manages the scroll height and logic */}
        <ScrollControls pages={5} damping={0.2}>
          <CameraRig />
          
          {/* The 3D World Elements scattered along the Z-axis (depth) */}
          
          {/* Hero Objects */}
          <TechObject position={[-4, 2, 0]} color="#D32F2F" scale={1.5} speed={0.5} />
          <TechObject position={[4, -2, -2]} color="#ffffff" scale={1} speed={1.2} />
          
          {/* About Objects */}
          <TechObject position={[5, 3, -20]} color="#D32F2F" scale={2.5} speed={0.8} />
          <TechObject position={[-6, -4, -25]} color="#222222" scale={3} speed={0.4} />
          
          {/* Skills Objects */}
          <TechObject position={[-5, 2, -40]} color="#ffffff" scale={2} speed={1.5} />
          <TechObject position={[4, -3, -45]} color="#D32F2F" scale={1.8} speed={0.7} />
          
          {/* Projects Objects */}
          <TechObject position={[0, -5, -60]} color="#D32F2F" scale={4} speed={0.3} />
          <TechObject position={[-8, 4, -65]} color="#ffffff" scale={1.5} speed={2} />
          <TechObject position={[7, 1, -70]} color="#222222" scale={3} speed={0.5} />
          
          {/* Contact Objects */}
          <TechObject position={[-4, -2, -85]} color="#D32F2F" scale={2} speed={1} />
          <TechObject position={[5, 3, -90]} color="#ffffff" scale={1.5} speed={1.5} />

          {/* Final Reveal Profile Image */}
          <React.Suspense fallback={null}>
            <WavyProfileImage position={[-3, -1, -100]} scale={4} />
          </React.Suspense>

          {/* Particle Tunnel Effect (simple representation) */}
          {Array.from({ length: 200 }).map((_, i) => (
            <mesh 
              key={i} 
              position={[
                (Math.random() - 0.5) * 40, 
                (Math.random() - 0.5) * 40, 
                -Math.random() * 100
              ]}
            >
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial color={Math.random() > 0.8 ? "#D32F2F" : "#ffffff"} />
            </mesh>
          ))}

          <HTMLContent />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
