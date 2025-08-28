import React from 'react';
import { Atom, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900/90 backdrop-blur-xl border-t border-cyan-500/30 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #10b981 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-18">
              <img
                src="https://res.cloudinary.com/dyvplq8wl/image/upload/v1756190191/amaravathi_footer_logo_kaawc0.png"
                alt="Amaravathi Quantum Valley Logo"
                className="w-full h-full object-contain filter hover:brightness-110 transition-all duration-300"
                onError={(e) => {
                  console.error('Footer logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-wide">
              Amaravathi Quantum Valley Hackathon 2025
            </h2>
            
            <p className="text-lg md:text-xl text-white font-semibold">
              RGUKT Srikakulam
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <div className="w-20 h-px bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-500"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>

          <p className="text-gray-400 text-sm mt-6">
            Pushing the Boundaries of Quantum Innovation
          </p>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 4 === 0 ? 'bg-cyan-400' : 
                i % 4 === 1 ? 'bg-emerald-400' : 
                i % 4 === 2 ? 'bg-blue-400' : 'bg-purple-400'
              } opacity-60`}
              style={{
                left: `${5 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animation: `quantumDrift ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes quantumDrift {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translate(10px, -15px) scale(1.2);
            opacity: 0.9;
          }
          50% { 
            transform: translate(-5px, -10px) scale(0.8);
            opacity: 0.4;
          }
          75% { 
            transform: translate(15px, -20px) scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;