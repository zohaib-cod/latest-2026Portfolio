"use client";

import { motion } from 'framer-motion';
import Hero3D from '../canvas/Hero3D';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3D />

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="glassmorphism p-12 rounded-3xl"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gradient"
          >
            ALI ZOHAIB
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-300 font-light mb-2"
          >
            FULL STACK DEVELOPER
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-[#D32F2F] font-medium mb-10 tracking-widest uppercase"
          >
            Artificial Intelligence & Robotics Graduate
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="#projects" className="px-8 py-3 bg-[#D32F2F] hover:bg-red-700 text-white rounded-full font-medium transition-all transform hover:scale-105 red-glow">
              View Projects
            </Link>
            <Link href="/resume.pdf" target="_blank" className="px-8 py-3 border border-white hover:border-[#D32F2F] hover:text-[#D32F2F] text-white rounded-full font-medium transition-all transform hover:scale-105">
              Download Resume
            </Link>
            <Link href="#contact" className="px-8 py-3 border border-white hover:border-[#D32F2F] hover:text-[#D32F2F] text-white rounded-full font-medium transition-all transform hover:scale-105">
              Contact Me
            </Link>
            <Link href="/admin/login" className="px-8 py-3 glassmorphism text-white rounded-full font-medium transition-all transform hover:scale-105 hover:bg-white/10">
              Admin Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
