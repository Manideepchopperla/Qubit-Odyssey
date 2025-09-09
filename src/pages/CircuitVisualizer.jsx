import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Eye, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import StepByStepExecution from './StepByStepExecution';

import QASMInput from './QASMInput';
import CircuitDisplay from './CircuitDisplay';
import QubitAnalysis from './QubitAnalysis';

const CircuitVisualizer = () => {
  const captureRef = useRef(null);

  const handleDownload = async () => {
    if (!captureRef.current) return;

    try {
      const dataUrl = await toPng(captureRef.current, {
        backgroundColor: '#000', 
        pixelRatio: 2,           
        cacheBust: true,
        filter: (node) => node.tagName !== 'IFRAME',
      });

      const link = document.createElement('a');
      link.download = 'quantum-visualizer.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Image capture failed:', error);
      alert('Screenshot failed. Try removing or excluding iframes.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden mt-20" ref={captureRef}>
      {/* Quantum Background Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Quantum Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>

        {/* Floating Quantum Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
              i % 4 === 0
                ? 'bg-purple-400'
                : i % 4 === 1
                ? 'bg-cyan-400'
                : i % 4 === 2
                ? 'bg-pink-400'
                : 'bg-blue-400'
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

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            {/* Quantum Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/40 backdrop-blur-sm"
            >
              <Atom className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-rajdhani text-sm text-purple-300 font-semibold tracking-wide">
                Quantum Qubit State Simulator
              </span>
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <h1 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
                Quantum State
              </span>
              <span className="block text-transparent  bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 mt-2">
                Visualizer
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-rajdhani text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Bridge between complex quantum circuits and intuitive{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
                Bloch sphere insights
              </span>
              . Visualize single-qubit mixed states from multi-qubit quantum circuits.
            </p>

            {/* Quantum Divider */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
              <div className="w-20 h-px bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"></div>
              <Eye className="w-5 h-5 text-cyan-400" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </motion.div>

          {/* Download Button */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/50 text-white font-semibold hover:from-purple-500/50 hover:to-cyan-500/50 transition-all duration-300 shadow-lg"
            >
              <Download className="w-4 h-4" />
              Download as Image
            </button>
          </div>

          {/* Main Interface Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* QASM Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-96 lg:h-[28rem]"
            >
              <div className="relative h-full">
                <div className="absolute -top-8 left-0 flex items-center gap-2 z-10">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
                  <span className="font-rajdhani text-sm text-purple-300 font-semibold tracking-wide">QASM Input</span>
                </div>
                <QASMInput />
              </div>
            </motion.div>

            {/* Circuit Display Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-96 lg:h-[28rem]"
            >
              <div className="relative h-full">
                <div className="absolute -top-8 right-0 flex items-center gap-2 z-10">
                  <span className="font-rajdhani text-sm text-cyan-300 font-semibold tracking-wide">Circuit Visualization</span>
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
                <CircuitDisplay />
              </div>
            </motion.div>
          </div>

          {/* Quantum Analysis Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
                <Atom className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <span className="font-orbitron text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                QUANTUM STATE ANALYSIS
              </span>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
              </div>
            </div>
            <QubitAnalysis />
          </motion.div>
        </div>
      </div>

      {/* Floating Formulas */}
      <div className="absolute top-20 left-8 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-purple-400 text-xs"
        >
          |ψ⟩ = αᵢ|0⟩ + βᵢ|1⟩
        </motion.div>
      </div>
      <div className="absolute bottom-32 right-12 hidden lg:block">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="font-mono text-cyan-400 text-xs"
        >
          ρ = Tr₂(|ψ⟩⟨ψ|)
        </motion.div>
      </div>
      <div className="absolute top-1/2 left-16 hidden xl:block">
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="font-mono text-pink-400 text-xs"
        >
          Tr(ρ²) = purity
        </motion.div>
      </div>

      {/* Iframe Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex items-center justify-center mb-12"
      >
        <div className="w-full max-w-10xl mx-auto">
          <div className="relative w-full h-0 pb-[40%] rounded-xl border border-purple-500/40 backdrop-blur-sm overflow-auto">
            <iframe
              src="./main.html"
              title="HTML Visualization"
              className="absolute top-0 left-0 w-full h-full border-none overflow-auto"
              style={{
                background: 'transparent',
                overflow: 'auto'
              }}
              scrolling="yes"
              frameBorder="0"
            />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes quantumFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-25px) translateX(15px) scale(1.3) rotate(90deg);
          }
          50% {
            transform: translateY(10px) translateX(-20px) scale(0.7) rotate(180deg);
          }
          75% {
            transform: translateY(-15px) translateX(10px) scale(1.1) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CircuitVisualizer;