import React from 'react';

const QuantumBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-emerald-900/20"></div>
      
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

      {/* Floating quantum particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-60 ${
              i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-blue-400'
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

      {/* Quantum circuit grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern"></div>
      </div>

      {/* Pulsing energy rings */}
      <div className="absolute top-3/4 left-1/4 w-64 h-64 hidden md:block">
        <div className="energy-ring ring-1"></div>
        <div className="energy-ring ring-2"></div>
        <div className="energy-ring ring-3"></div>
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
          animation: rotateCube 20s linear infinite;
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
          border: 2px solid rgba(6, 182, 212, 0.6);
          background: linear-gradient(45deg, 
            rgba(6, 182, 212, 0.1) 0%, 
            rgba(16, 185, 129, 0.1) 50%, 
            rgba(59, 130, 246, 0.1) 100%);
          backdrop-filter: blur(2px);
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
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #10b981, #06b6d4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
        }
        
        .grid-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .energy-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(16, 185, 129, 0.3);
          animation: energyPulse 3s ease-in-out infinite;
        }
        
        .ring-1 {
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 0s;
        }
        
        .ring-2 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 1s;
        }
        
        .ring-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 2s;
        }
        
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          33% { 
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 1;
          }
          66% { 
            transform: translateY(10px) translateX(-15px) scale(0.8);
            opacity: 0.4;
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.7;
          }
        }
        
        @keyframes energyPulse {
          0% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.3;
          }
          100% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumBackground;