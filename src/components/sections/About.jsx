"use client";

import { motion } from 'framer-motion';

export default function AboutSection({ profile }) {
  if (!profile) return null;
  
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="glassmorphism p-10 md:p-16 rounded-3xl"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {profile.profileImage && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-[#D32F2F] shadow-[0_0_30px_rgba(211,47,47,0.3)]"
            >
              <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
            </motion.div>
          )}
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase tracking-wider"
            >
              About <span className="text-[#D32F2F]">Me</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 leading-relaxed mb-6"
            >
              {profile.bio || "I transform complex problems into elegant digital solutions. With a deep foundation in AI and Robotics, I engineer scalable backends and immersive frontend experiences."}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-gray-400"
            >
              Based in {profile.location || "Lahore, Pakistan"}.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
