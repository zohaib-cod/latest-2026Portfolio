"use client";

import { motion } from 'framer-motion';

export default function ExperienceSection({ experience }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white uppercase tracking-wider">
          Experience <span className="text-[#D32F2F]">Timeline</span>
        </h2>
        
        <div className="relative border-l-2 border-[#D32F2F]/30 ml-4 md:ml-0 md:pl-0 pl-8 space-y-12">
          {experience.map((exp, index) => (
            <motion.div
              key={exp._id || index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative md:w-1/2 md:even:ml-auto md:odd:pr-12 md:even:pl-12 md:even:border-l-0"
            >
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-[#D32F2F] rounded-full -left-[41px] md:left-auto md:right-[-9px] md:even:left-[-9px] top-1 shadow-[0_0_10px_rgba(211,47,47,0.8)]" />
              
              <div className="glassmorphism p-8 rounded-2xl border border-white/5 hover:border-[#D32F2F]/40 transition-colors">
                <span className="text-[#D32F2F] font-bold tracking-widest uppercase text-sm block mb-2">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                <h4 className="text-lg text-gray-300 mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
