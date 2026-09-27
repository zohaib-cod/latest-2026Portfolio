"use client";

import { motion } from 'framer-motion';

export default function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white uppercase tracking-wider">
          Featured <span className="text-[#D32F2F]">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glassmorphism rounded-3xl overflow-hidden flex flex-col border border-white/10 hover:border-[#D32F2F]/50 transition-colors"
            >
              <div className="relative h-64 overflow-hidden bg-black/50">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map(tech => (
                    <span key={tech} className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#D32F2F] text-white rounded-full font-medium text-sm hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(211,47,47,0.4)]">
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-white/30 text-white rounded-full font-medium text-sm hover:bg-white hover:text-black transition-colors">
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
