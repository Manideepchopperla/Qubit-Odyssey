import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Atom, Eye, Info, Zap } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';
import { motion } from 'framer-motion';

const QubitAnalysis = () => {
  const { results } = useQuantum();
  const navigate = useNavigate();

  if (!results?.qubits?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
      >
        {/* Quantum Background Pattern with Hero Colors */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>

        {/* Hero-matching Quantum Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-blue-500/5 to-cyan-500/8 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
              <Atom className="text-purple-400 animate-spin" size={24} style={{animationDuration: '8s'}} />
            </div>
            <h2 className="font-orbitron text-1xl lg:text-2xl font-bold text-white">
              Qubit Analysis
            </h2>
          </div>
          
          <div className="text-center text-gray-400 py-20">
            <div className="relative w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              
              <Atom size={48} className="opacity-60 text-purple-400 relative z-10 animate-spin" style={{animationDuration: '10s'}} />
            </div>
            <p className="font-rajdhani text-lg font-medium text-gray-300">
              Initialize quantum circuit to view qubit states
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-px bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400"></div>
              
            </div>
          </div>
        </div>

        {/* Floating Quantum Particles with Hero Colors */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
              i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `quantumFloat ${4 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </motion.div>
    );
  }

  const handleViewCalculation = (qubitIdx) => {
    navigate(`/calculation/${qubitIdx}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
    >
      {/* Hero-matching Background Effects */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-2xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
            <Atom className="text-purple-400 animate-spin" size={24} style={{animationDuration: '8s'}} />
          </div>
          <h2 className="font-orbitron text-1xl lg:text-2xl font-bold text-white">
            Qubit Analysis
          </h2>
          <div className="flex-1 flex justify-end">
            <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/40 backdrop-blur-sm">
              <span className="font-rajdhani text-sm text-purple-300 font-semibold">
                {results.qubits.length} Qubits
              </span>
            </div>
          </div>
        </div>
        
        {/* Qubits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {results.qubits.map((qubit, index) => (
            <motion.div 
              key={qubit.idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              {/* Hero-matching Quantum Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-blue-500/8 to-cyan-500/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card Content */}
              <div className="relative z-10">
                {/* Qubit Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow duration-300">
                        <span className="text-sm font-bold text-white">
                          {qubit.idx}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                        Qubit {qubit.idx}
                      </h3>
                      <p className="font-rajdhani text-xs text-gray-400">Quantum State Vector</p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        qubit.purity_state?.toLowerCase() === "pure"
                          ? "bg-green-500/20 text-green-400 border border-green-400/40"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/40"
                      }`}
                    >
                      {qubit.purity_state}
                    </span>
                  </div>
                </div>


                
                {/* Bloch Sphere */}
                <div className="mb-6 relative">
                  <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/30 group-hover:border-cyan-400/50 transition-colors duration-300">
                    <img
                      src={`data:image/png;base64,${qubit.bloch_img}`}
                      alt={`Qubit ${qubit.idx} Bloch Sphere`}
                      className="w-full bg-white shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Floating Formula */}
                  <div className="absolute -top-2 -right-2 bg-black/80 backdrop-blur-sm border border-purple-400/50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="font-mono text-xs text-purple-400">|ψ_{qubit.idx}⟩</div>
                  </div>
                </div>
                
                {/* Properties */}
                <div className="space-y-4 mb-6">
                  {/* Density Matrix */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 group-hover:border-purple-500/30 transition-colors duration-300">
                    <h4 className="font-rajdhani text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Info size={14} className="text-purple-400" />
                      Reduced Density Matrix
                    </h4>
                    <div 
                      className="text-xs text-gray-100 overflow-x-auto font-mono"
                      dangerouslySetInnerHTML={{ 
                        __html: qubit.mat_html.replace(
                          /class='table table-sm table-bordered text-center'/, 
                          "class='w-full text-center text-xs quantum-matrix'"
                        ) 
                      }}
                    />
                  </div>
                  
                  {/* Purity */}
                  <div className="flex justify-between items-center bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 group-hover:border-cyan-500/30 transition-colors duration-300">
                    <span className="font-rajdhani text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Zap size={14} className="text-cyan-400" />
                      Purity:
                    </span>
                    <span className=" text-sm text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-500/30">
                      {qubit.purity}
                    </span>
                  </div>
                  
                  {/* Bloch Vector */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 group-hover:border-blue-500/30 transition-colors duration-300">
                    <h4 className="font-rajdhani text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      Bloch Vector:
                    </h4>
                    <p className="font-mono text-xs text-blue-400 bg-blue-500/20 px-3 py-2 rounded-lg break-all border border-blue-500/30">
                      ({qubit.bloch_vec})
                    </p>
                  </div>
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => handleViewCalculation(qubit.idx)}
                  className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-rajdhani text-sm font-semibold shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 border border-purple-500/30 hover:border-cyan-500/50"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline">Detailed Analysis</span>
                  <span className="sm:hidden">Details</span>
                  
                </button>
              </div>

              {/* Floating Particles with Hero Colors */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-80 ${
                      i % 3 === 0 ? 'bg-purple-400' : 
                      i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
                    }`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${15 + i * 25}%`,
                      animation: `quantumParticleFloat ${3 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Floating Particles with Hero Colors */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full opacity-30 ${
            i % 3 === 0 ? 'bg-purple-400' : 
            i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
          }`}
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 20}%`,
            animation: `quantumFloat ${5 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1.2) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(5px) translateX(-15px) scale(0.8) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-10px) translateX(8px) scale(1.1) rotate(270deg);
            opacity: 0.8;
          }
        }

        @keyframes quantumParticleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          33% {
            transform: translateY(-12px) translateX(8px) scale(1.3) rotate(120deg);
            opacity: 1;
          }
          66% {
            transform: translateY(6px) translateX(-10px) scale(0.7) rotate(240deg);
            opacity: 0.6;
          }
        }

        :global(.quantum-matrix) {
          border-color: rgba(147, 51, 234, 0.3) !important;
        }

        :global(.quantum-matrix td) {
          border-color: rgba(147, 51, 234, 0.2) !important;
          padding: 4px 8px !important;
        }
      `}</style>
    </motion.div>
  );
};

export default QubitAnalysis;