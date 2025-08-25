import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="relative z-50 bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="relative">
              <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-cyan-500/30">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/CBcmkyZ8v4tAc8PSDcEgvM.jpg"
                  alt="Quantum"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gradient-to-r', 'from-cyan-500', 'via-emerald-400', 'to-blue-500');
                  }}
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
                Qubit Odyssey
              </h1>
            </div>
          </div>

          {/* Desktop About Link */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-300 hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-700/30 font-medium"
            >
              About
            </button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="toggle menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                { menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                }
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden animate-dropdown bg-gray-800 rounded-b-xl shadow-lg px-4 py-4 mt-1 absolute left-0 w-full flex flex-col items-start">
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-200 hover:bg-gray-700 w-full text-left px-3 py-2 rounded-lg transition"
            >
              About
            </button>
          </div>
        )}
      </div>

      {/* Quantum particle effects, you can keep or remove */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-blue-400'
            } opacity-40`}
            style={{
              left: `${10 + i * 20}%`,
              top: '50%',
              animation: `navParticleFloat ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes navParticleFloat {
          0%, 100% {
            transform: translateY(-50%) translateX(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-50%) translateX(8px) scale(1.3);
            opacity: 0.8;
          }
        }
        .animate-dropdown {
          animation: dropdown .25s ease;
        }
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
