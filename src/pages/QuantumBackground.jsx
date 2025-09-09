import React from 'react';

const QuantumBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Quantum gradient background matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/10 via-transparent to-purple-900/15"></div>
      
      {/* 3D Rotating Quantum Cubit */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 perspective-1000 hidden lg:block">
        <div className="cube-container">
          <div className="cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
            {/* Inner quantum core */}
            <div className="quantum-core"></div>
          </div>
        </div>
      </div>

      {/* Additional smaller cubit for mobile */}
      <div className="absolute top-1/3 right-8 w-16 h-16 perspective-500 lg:hidden">
        <div className="cube-container">
          <div className="cube scale-50">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
            <div className="quantum-core"></div>
          </div>
        </div>
      </div>

      {/* Floating quantum particles with quantum theme colors */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-60 ${
              i % 4 === 0 ? 'bg-purple-400' : 
              i % 4 === 1 ? 'bg-cyan-400' : 
              i % 4 === 2 ? 'bg-pink-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `quantumFloat ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Quantum circuit grid with purple theme */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>

      {/* Pulsing energy rings */}
      <div className="absolute top-3/4 left-1/4 w-64 h-64 hidden md:block">
        <div className="energy-ring ring-1"></div>
        <div className="energy-ring ring-2"></div>
        <div className="energy-ring ring-3"></div>
      </div>

      {/* Additional quantum energy rings */}
      <div className="absolute top-1/5 right-1/5 w-48 h-48 hidden lg:block">
        <div className="energy-ring ring-cyan"></div>
        <div className="energy-ring ring-pink"></div>
      </div>

      {/* Floating quantum formulas */}
      <div className="absolute top-20 left-10 opacity-20 hidden lg:block">
        <div className="font-mono text-purple-400 text-xs animate-pulse">
          |ψ⟩ = α|0⟩ + β|1⟩
        </div>
      </div>
      
      <div className="absolute bottom-32 right-20 opacity-20 hidden lg:block">
        <div className="font-mono text-cyan-400 text-xs animate-pulse" style={{animationDelay: '1s'}}>
          H|0⟩ = |+⟩
        </div>
      </div>
      
      <div className="absolute top-1/2 left-20 opacity-20 hidden xl:block">
        <div className="font-mono text-pink-400 text-xs animate-pulse" style={{animationDelay: '2s'}}>
          ⟨ψ|ψ⟩ = 1
        </div>
      </div>

      {/* Quantum interference pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="interference-pattern"></div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .perspective-500 {
          perspective: 500px;
        }
        
        .cube-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 25s linear infinite;
        }
        
        .cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(168, 85, 247, 0.6);
          background: linear-gradient(45deg, 
            rgba(168, 85, 247, 0.1) 0%, 
            rgba(6, 182, 212, 0.1) 50%, 
            rgba(236, 72, 153, 0.1) 100%);
          backdrop-filter: blur(3px);
          box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.1);
        }
        
        .cube-face.front { transform: rotateY(0deg) translateZ(64px); }
        .cube-face.back { transform: rotateY(180deg) translateZ(64px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(64px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(64px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(64px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(64px); }
        
        .quantum-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #a855f7, #06b6d4, #ec4899);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: quantumPulse 2.5s ease-in-out infinite;
          box-shadow: 
            0 0 20px rgba(168, 85, 247, 0.8),
            0 0 40px rgba(6, 182, 212, 0.4),
            0 0 60px rgba(236, 72, 153, 0.2);
        }
        
        .grid-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .interference-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
          background-size: 200px 200px, 250px 250px, 180px 180px;
          animation: interferenceShift 15s ease-in-out infinite;
        }
        
        .energy-ring {
          position: absolute;
          border-radius: 50%;
          animation: energyPulse 4s ease-in-out infinite;
        }
        
        .ring-1 {
          width: 120px;
          height: 120px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(168, 85, 247, 0.4);
          animation-delay: 0s;
        }
        
        .ring-2 {
          width: 180px;
          height: 180px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(6, 182, 212, 0.3);
          animation-delay: 1.3s;
        }
        
        .ring-3 {
          width: 240px;
          height: 240px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(236, 72, 153, 0.3);
          animation-delay: 2.6s;
        }
        
        .ring-cyan {
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(6, 182, 212, 0.5);
          animation-delay: 0.5s;
        }
        
        .ring-pink {
          width: 160px;
          height: 160px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(236, 72, 153, 0.4);
          animation-delay: 2s;
        }
        
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-25px) translateX(15px) scale(1.3) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(10px) translateX(-20px) scale(0.7) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-15px) translateX(10px) scale(1.1) rotate(270deg);
            opacity: 0.8;
          }
        }
        
        @keyframes quantumPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% { 
            transform: translate(-50%, -50%) scale(1.5) rotate(120deg);
            opacity: 0.8;
          }
          66% { 
            transform: translate(-50%, -50%) scale(0.8) rotate(240deg);
            opacity: 0.9;
          }
        }
        
        @keyframes energyPulse {
          0% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
            border-color: inherit;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.3;
            border-color: rgba(168, 85, 247, 0.6);
          }
          100% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
            border-color: inherit;
          }
        }
        
        @keyframes interferenceShift {
          0%, 100% { 
            transform: translateX(0px) translateY(0px);
          }
          33% { 
            transform: translateX(30px) translateY(-20px);
          }
          66% { 
            transform: translateX(-20px) translateY(25px);
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumBackground;