import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-center">
        <div className="typewriter-container relative overflow-hidden">
          <span className="typewriter-text text-white text-[3px] md:text-xs font-bold tracking-wide">
            Need Help!
          </span>
        </div>

      <button
        onClick={onClick}
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
      >
        <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform duration-200 md:w-6 md:h-6" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 animate-ping opacity-20"></div>
        
        {/* Quantum particles around button */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 h-0.5 md:w-1 md:h-1 rounded-full ${
                i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-blue-400'
              } opacity-60`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 15}%`,
                animation: `chatParticleFloat ${2 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

          .typewriter-container {
            font-family: 'Orbitron', 'Courier New', monospace;
            position: relative;
          }

          .typewriter-text {
            font-family: 'Orbitron', 'Courier New', monospace;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
            letter-spacing: 0.1em;
            position: relative;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            width: 0;
            animation: typewriter 4s ease-in-out infinite;
          }

          .typewriter-text::after {
            content: '|';
            color: rgba(6, 182, 212, 0.8);
            animation: cursor-blink 1s infinite;
            margin-left: 2px;
          }

          @keyframes typewriter {
            0% {
              width: 0;
            }
            20% {
              width: 0;
            }
            50% {
              width: 100%;
            }
            70% {
              width: 100%;
            }
            100% {
              width: 0;
            }
          }

          @keyframes cursor-blink {
            0%, 50% {
              opacity: 1;
            }
            51%, 100% {
              opacity: 0;
            }
          }

          @keyframes chatParticleFloat {
            0%, 100% { 
              transform: translate(0px, 0px) scale(1);
              opacity: 0.6;
            }
            50% { 
              transform: translate(10px, -10px) scale(1.2);
              opacity: 1;
            }
          }

          /* Mobile adjustments */
          @media (max-width: 640px) {
            .typewriter-text {
              font-size: 0.75rem;
              letter-spacing: 0.05em;
            }
            
            .typewriter-text::after {
              margin-left: 1px;
            }
          }
        `}</style>
      </button>
    </div>
  );
};

export default ChatButton;