"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this URL will come from .env
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/projects`);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative min-h-screen w-full py-20 px-6">
      <div className="max-w-7xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient uppercase tracking-widest mb-4">
            Selected Works
          </h1>
          <div className="h-1 w-24 bg-[#D32F2F]"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D32F2F]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="group relative glassmorphism rounded-2xl overflow-hidden hover:red-glow transition-all duration-500"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10 duration-500" />
                  <img 
                    src={project.imageUrl || (project.images && project.images[0]) || 'https://via.placeholder.com/600x400'} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies?.map(tech => (
                      <span key={tech} className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#D32F2F]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#D32F2F] transition-colors">
                        <ExternalLink size={20} />
                        <span className="font-medium">Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#D32F2F] transition-colors">
                        <FaGithub size={20} />
                        <span className="font-medium">Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
