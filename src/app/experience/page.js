"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/experience');
        setExperiences(data);
      } catch (error) {
        setExperiences([
          {
            _id: '1',
            title: 'Senior AI Engineer',
            company: 'TechNova Robotics',
            location: 'Remote',
            startDate: '2023-01-01',
            current: true,
            description: 'Leading the development of autonomous navigation systems using deep reinforcement learning and computer vision.',
          },
          {
            _id: '2',
            title: 'Full Stack Developer',
            company: 'CyberSynth Solutions',
            location: 'Lahore, Pakistan',
            startDate: '2020-05-01',
            endDate: '2022-12-31',
            current: false,
            description: 'Built highly scalable microservices architecture. Migrated legacy React codebase to Next.js resulting in 40% faster load times.',
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  return (
    <div className="relative min-h-screen w-full py-20 px-6 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D32F2F]/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient uppercase tracking-widest mb-4">
            Experience Timeline
          </h1>
          <p className="text-gray-400">My professional journey in software engineering and AI.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D32F2F]"></div>
          </div>
        ) : (
          <div className="relative border-l-2 border-[#D32F2F]/30 ml-3 md:ml-6 space-y-12 pb-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[11px] md:-left-[11px] top-1 bg-black border-2 border-[#D32F2F] w-5 h-5 rounded-full z-10">
                  <div className="absolute inset-1 bg-[#D32F2F] rounded-full animate-pulse" />
                </div>
                
                <div className="glassmorphism p-8 rounded-2xl hover:border-[#D32F2F]/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Briefcase size={20} className="text-[#D32F2F]" />
                        {exp.title}
                      </h3>
                      <h4 className="text-xl text-gray-300 font-light mt-1">{exp.company}</h4>
                    </div>
                    <div className="mt-2 md:mt-0 text-sm font-mono text-[#D32F2F] bg-[#D32F2F]/10 px-4 py-1 rounded-full inline-block">
                      {new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : ''}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
