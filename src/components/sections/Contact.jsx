"use client";

import { motion } from 'framer-motion';

export default function ContactSection({ profile }) {
  if (!profile) return null;

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto relative z-10 mb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="glassmorphism p-12 md:p-20 rounded-3xl text-center border border-[#D32F2F]/20 relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D32F2F] opacity-10 rounded-full blur-[100px] pointer-events-none" />
        
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white uppercase tracking-wider relative z-10">
          Let's <span className="text-[#D32F2F]">Connect</span>
        </h2>
        <p className="text-xl text-gray-300 mb-10 relative z-10 max-w-2xl mx-auto">
          I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${profile.email || 'hello@alizohaib.com'}`}
          className="inline-block px-10 py-4 bg-[#D32F2F] text-white rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(211,47,47,0.4)] relative z-10"
        >
          Say Hello
        </motion.a>

        <div className="flex justify-center gap-6 mt-16 relative z-10">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
              LinkedIn
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
              Twitter
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
