"use client";

import { motion } from 'framer-motion';

export default function ServicesSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white uppercase tracking-wider">
          Services & <span className="text-[#D32F2F]">Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glassmorphism p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-[#D32F2F]/50"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{skill.name}</h3>
              <div className="w-12 h-1 bg-[#D32F2F] mb-4 rounded-full" />
              <p className="text-gray-400 uppercase tracking-widest text-sm">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
