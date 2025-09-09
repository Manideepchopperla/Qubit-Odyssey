import React from 'react';
import { Atom, Zap } from 'lucide-react';
import quantumHeroBg from '@/assets/quantum-hero-bg.jpg';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Clean Hero-matching Background */}
      <div className="absolute inset-0">
        {/* Same background as hero section */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${quantumHeroBg})`,
            filter: 'blur(2px) brightness(0.2)'
          }}
        />
        
        {/* Clean overlay matching hero */}
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* Simple top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Content */}
        <div className="text-center space-y-8">
          
          {/* Logo Section */}
          <div className="flex justify-center">
            <div className="w-20 h-14 sm:w-24 sm:h-16">
              <img
                src="https://res.cloudinary.com/dyvplq8wl/image/upload/v1756190191/amaravathi_footer_logo_kaawc0.png"
                alt="Amaravathi Quantum Valley"
                className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="font-orbitron text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
              Amaravathi Quantum Valley Hackathon 2025
            </h2>
            <p className="font-rajdhani text-base sm:text-lg text-gray-300 font-medium">
              RGUKT Srikakulam
            </p>
          </div>

          {/* Simple Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-400/60"></div>
            <Atom className="w-4 h-4 text-purple-400 opacity-70" />
            <div className="w-16 h-px bg-gradient-to-r from-purple-400/60 to-cyan-400/60"></div>
            <Zap className="w-4 h-4 text-cyan-400 opacity-70" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
          </div>

          {/* Tagline */}
          <p className="font-rajdhani text-sm text-gray-400 tracking-wide">
            Quantum Circuit Visualization Platform
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