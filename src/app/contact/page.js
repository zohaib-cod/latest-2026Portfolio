"use client";

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // In production, connect to real endpoint
      // await axios.post('http://localhost:5000/api/messages', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen w-full py-20 px-6 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 mt-10">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
            Let's <span className="text-[#D32F2F]">Talk</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Whether you have a question, a project in mind, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center group-hover:bg-[#D32F2F]/20 transition-colors">
                <Mail size={24} className="text-[#D32F2F]" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-1">Email</h4>
                <p className="text-white text-lg">hello@alizohaib.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center group-hover:bg-[#D32F2F]/20 transition-colors">
                <MapPin size={24} className="text-[#D32F2F]" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-1">Location</h4>
                <p className="text-white text-lg">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glassmorphism p-10 rounded-3xl space-y-6 relative overflow-hidden">
            {/* Glowing orb behind form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D32F2F] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D32F2F] transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D32F2F] transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D32F2F] transition-colors resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-[#D32F2F] hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 red-glow"
            >
              {status === 'loading' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
            
            {status === 'success' && (
              <p className="text-green-400 text-center text-sm mt-4">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center text-sm mt-4">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
