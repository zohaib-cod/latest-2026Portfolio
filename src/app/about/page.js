"use client";

import { motion } from 'framer-motion';
import { User, Code, Server, Database } from 'lucide-react';
import Hero3D from '@/components/canvas/Hero3D';

export default function About() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6">
      <div className="absolute inset-0 z-0 opacity-30">
        <Hero3D />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto w-full glassmorphism p-12 rounded-3xl mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient uppercase tracking-wider">
              About Me
            </h1>
            <h2 className="text-2xl text-gray-300 mb-6 font-light">
              Transforming complex problems into elegant digital solutions.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Hello! I'm Ali Zohaib, a Full Stack Developer with a background in Artificial Intelligence and Robotics. 
              I specialize in building premium, high-performance web applications that merge stunning visuals with robust backend architectures.
              My goal is to create immersive digital experiences that not only look incredible but function flawlessly.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl hover:border-[#D32F2F] transition-colors">
                <Code className="text-[#D32F2F] mb-3" size={32} />
                <h3 className="font-bold text-white mb-1">Frontend</h3>
                <p className="text-sm text-gray-500">React, Next.js, Three.js, GSAP</p>
              </div>
              <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl hover:border-[#D32F2F] transition-colors">
                <Server className="text-[#D32F2F] mb-3" size={32} />
                <h3 className="font-bold text-white mb-1">Backend</h3>
                <p className="text-sm text-gray-500">Node.js, Express, Python</p>
              </div>
              <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl hover:border-[#D32F2F] transition-colors">
                <Database className="text-[#D32F2F] mb-3" size={32} />
                <h3 className="font-bold text-white mb-1">Database</h3>
                <p className="text-sm text-gray-500">MongoDB, PostgreSQL</p>
              </div>
              <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl hover:border-[#D32F2F] transition-colors">
                <User className="text-[#D32F2F] mb-3" size={32} />
                <h3 className="font-bold text-white mb-1">AI / Robotics</h3>
                <p className="text-sm text-gray-500">Machine Learning, Automation</p>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-black to-[#D32F2F]/20 mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="Cyberpunk workspace" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
