import React from 'react';
import { Atom, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import quantumHeroBg from '@/assets/quantum-hero-bg.jpg';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Clean Hero-matching Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${quantumHeroBg})`,
            filter: 'blur(2px) brightness(0.2)'
          }}
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* Simple top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Main Content */}
        <div className="text-center space-y-8">

          {/* Logo & Brand */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
              Qubit Odyssey
            </h2>
          </div>

          {/* Description */}
          <p className="font-rajdhani text-sm sm:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
            An interactive quantum computing learning platform. Visualize quantum circuits,
            explore qubit states, and understand quantum mechanics through hands-on experimentation.
          </p>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <Link to="/" className="font-rajdhani text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Home
            </Link>
            <Link to="/circuit" className="font-rajdhani text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Qubit Viz
            </Link>
            <Link to="/about" className="font-rajdhani text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              How It Works
            </Link>
          </div>

          {/* Simple Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-400/60"></div>
            <Atom className="w-4 h-4 text-purple-400 opacity-70" />
            <div className="w-16 h-px bg-gradient-to-r from-purple-400/60 to-cyan-400/60"></div>
            <Zap className="w-4 h-4 text-cyan-400 opacity-70" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
          </div>

          {/* Copyright */}
          <p className="font-rajdhani text-xs text-gray-500 tracking-wide">
            &copy; {new Date().getFullYear()} Qubit Odyssey. Built for quantum exploration.
          </p>

        </div>

        {/* Minimal floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-30 ${
                i % 3 === 0 ? 'bg-purple-400' :
                i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 15}%`,
                animation: `float ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.6;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
