"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Menu, X, Award, FileText } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { name: 'Home', path: '/', icon: <Home size={20} /> },
  { name: 'About', path: '/about', icon: <User size={20} /> },
  { name: 'Projects', path: '/projects', icon: <Code size={20} /> },
  { name: 'Experience', path: '/experience', icon: <Briefcase size={20} /> },
  { name: 'Services', path: '/services', icon: <FileText size={20} /> },
  { name: 'Achievements', path: '/achievements', icon: <Award size={20} /> },
  { name: 'Contact', path: '/contact', icon: <Mail size={20} /> },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glassmorphism hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            ALI<span className="text-[#D32F2F]">ZOHAIB</span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={clsx(
                    "flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-[#D32F2F]",
                    isActive ? "text-[#D32F2F]" : "text-gray-300"
                  )}
                >
                  {item.icon}
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-4 h-0.5 w-8 bg-[#D32F2F]" 
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 glassmorphism rounded-full text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-4 text-2xl font-bold transition-all duration-300",
                  isActive ? "text-[#D32F2F]" : "text-white"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </motion.div>
      )}
    </>
  );
}
