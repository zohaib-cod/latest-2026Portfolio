"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Float, Text3D, Center, useScroll, MeshDistortMaterial } from '@react-three/drei';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import WavyProfileImage from './WavyProfileImage';

// Optimized Particle Tunnel
function OptimizedParticles({ count = 250 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = -Math.random() * 120;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const red = new THREE.Color("#D32F2F");
    const white = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      const color = Math.random() > 0.8 ? red : white;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return col;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors sizeAttenuation />
    </points>
  );
}

// A component to move the camera based on scroll
function CameraRig() {
  const scroll = useScroll();
  
  useFrame((state) => {
    // scroll.offset goes from 0 to 1
    // We want to move the camera forward (negative Z) as we scroll
    const zPos = -scroll.offset * 120; // Move 120 units deep
    
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
function HTMLContent({ data }) {
  const profile = data?.profile || {};
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const experience = data?.experience || [];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <Scroll html style={{ width: '100%', height: '100%' }}>
      {/* Section 1: Hero (z = 0) */}
      <div className="w-screen h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-gradient uppercase">
          {profile.name || "Ali Zohaib"}
        </h1>
        <h2 className="text-2xl md:text-4xl text-gray-300 font-light mb-6">
          {profile.title || "Full Stack Developer"}
        </h2>
        <p className="text-lg md:text-xl text-[#D32F2F] tracking-widest uppercase mb-12">
          {profile.subtitle || "Artificial Intelligence & Robotics Graduate"}
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
            {profile.bio || "I transform complex problems into elegant digital solutions."}
          </p>
          <p className="text-lg text-gray-400">
            Based in {profile.location || "Lahore, Pakistan"}.
          </p>
        </div>
      </div>

      {/* Section 3: Skills (z = roughly -40) */}
      <div className="w-screen h-screen flex flex-col items-end justify-start px-10 md:px-32 pt-24 overflow-y-auto pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-xl w-full glassmorphism p-10 rounded-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white uppercase tracking-wider text-right">
            Core <span className="text-[#D32F2F]">Skills</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="border-b border-white/10 pb-4">
                <h3 className="text-white font-bold mb-1">{skill.name}</h3>
                <p className="text-[#D32F2F] text-sm tracking-widest uppercase">{skill.level}</p>
              </div>
            ))}
            {skills.length === 0 && <p className="text-gray-400 text-right col-span-2">No skills added yet.</p>}
          </div>
        </div>
      </div>

      {/* Section 4: Projects (z = roughly -60) */}
      <div className="w-screen h-screen flex flex-col items-center justify-start px-6 pt-24 overflow-y-auto pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-6xl w-full text-center pb-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 text-white uppercase tracking-wider">
            Featured <span className="text-[#D32F2F]">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-left" style={{ scrollBehavior: 'smooth' }}>
            {projects.map((project, i) => (
              <div key={i} className="glassmorphism p-6 rounded-2xl border border-white/10 flex flex-col h-full">
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map(t => <span key={t} className="text-xs bg-white/10 px-2 py-1 rounded">{t}</span>)}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" className="text-xs font-bold text-white bg-[#D32F2F] px-4 py-2 rounded">Live</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-xs font-bold text-white border border-white/30 px-4 py-2 rounded">GitHub</a>}
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-400 w-full text-center col-span-1 md:col-span-2">No projects added yet.</p>}
          </div>
        </div>
      </div>

      {/* Section 5: Experience (z = roughly -80) */}
      <div className="w-screen h-screen flex flex-col items-start justify-start px-10 md:px-32 pt-24 overflow-y-auto pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-3xl w-full glassmorphism p-10 rounded-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white uppercase tracking-wider">
            Experience <span className="text-[#D32F2F]">Timeline</span>
          </h2>
          <div className="space-y-8 pl-4 border-l-2 border-[#D32F2F]/30">
            {experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute w-4 h-4 bg-[#D32F2F] rounded-full -left-[25px] top-1" />
                <span className="text-[#D32F2F] font-bold text-sm">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                <h3 className="text-xl font-bold text-white mt-1">{exp.title}</h3>
                <h4 className="text-gray-300 mb-2">{exp.company}</h4>
                <p className="text-sm text-gray-400">{exp.description}</p>
              </div>
            ))}
            {experience.length === 0 && <p className="text-gray-400">No experience added yet.</p>}
          </div>
        </div>
      </div>

      {/* Section 6: Contact & Final Reveal (z = roughly -100 to -120) */}
      <div className="w-screen min-h-screen flex flex-col items-center justify-between pt-32 pb-10 px-6 relative pointer-events-none">
        
        {/* Contact Top */}
        <div className="flex flex-col items-center justify-center w-full pointer-events-auto">
          <h2 className="text-5xl md:text-8xl font-bold mb-4 text-white uppercase tracking-wider text-center">
            Let's <span className="text-[#D32F2F]">Connect</span>
          </h2>
          <a href={`mailto:${profile.email || 'hello@alizohaib.com'}`} className="text-2xl md:text-4xl text-gray-300 hover:text-white border-b-2 border-[#D32F2F] pb-1 transition-colors">
            {profile.email || 'hello@alizohaib.com'}
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

export default function Experience3D({ data }) {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#D32F2F" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        
        <Environment preset="city" />

        {/* ScrollControls manages the scroll height and logic */}
        <ScrollControls pages={6} damping={0.2}>
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
          
          {/* Experience Objects */}
          <TechObject position={[-6, 1, -80]} color="#D32F2F" scale={2.5} speed={1.1} />
          <TechObject position={[6, -3, -85]} color="#ffffff" scale={1.5} speed={0.6} />

          {/* Contact Objects */}
          <TechObject position={[-4, -2, -105]} color="#D32F2F" scale={2} speed={1} />
          <TechObject position={[5, 3, -110]} color="#ffffff" scale={1.5} speed={1.5} />

          {/* Final Reveal Profile Image */}
          <React.Suspense fallback={null}>
            <WavyProfileImage position={[-3, -1, -120]} scale={4} />
          </React.Suspense>

          {/* Particle Tunnel Effect */}
          <OptimizedParticles count={500} />

          <HTMLContent data={data} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
