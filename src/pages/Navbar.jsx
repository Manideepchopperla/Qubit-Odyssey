import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleGithubClick = () => {
    window.open('https://github.com/Manideepchopperla/Qubit-Odyssey', '_blank');
  };

  return (
    <nav className="relative z-50 bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="relative">
              <div className="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-cyan-500/30">
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
              <h1 className="text-lg lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
                Qubit Odyssey
              </h1>
            </div>
          </div>

          {/* Right - Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-300 hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-700/30 font-medium"
            >
              How It Works?
            </button>
            <button
              onClick={() => handleNavigation('/teams')}
              className="text-gray-300 hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-700/30 font-medium"
            >
              Teams
            </button>
            {/* <button
              onClick={handleGithubClick}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-gray-600 hover:border-gray-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </button> */}
          </div>

          {/* Right - Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="toggle menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden animate-dropdown bg-gray-800 rounded-b-xl shadow-lg px-4 py-4 mt-1 absolute left-0 w-full flex flex-col items-start z-50">
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-200 hover:bg-gray-700 w-full text-left px-3 py-2 rounded-lg transition"
            >
              How It Works?
            </button>
            <button
              onClick={() => handleNavigation('/teams')}
              className="text-gray-200 hover:bg-gray-700 w-full text-left px-3 py-2 rounded-lg transition"
            >
              Teams
            </button>
            {/* <button
              onClick={handleGithubClick}
              className="flex items-center gap-2 text-gray-200 hover:bg-gray-700 w-full text-left px-3 py-2 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </button> */}
          </div>
        )}
      </div>

      {/* Quantum particle effects */}
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