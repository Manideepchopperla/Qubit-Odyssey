import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Loader, Atom, Zap, Eye } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const CalculationDetail = () => {
  const { qubitIdx } = useParams();
  const navigate = useNavigate();
  const { results, saveCalculationData, getCalculationData } = useQuantum();

  const [calculationData, setCalculationData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const qubitData = results?.qubits?.find(q => q.idx === Number(qubitIdx));

  useEffect(() => {
    const startFromBottom = () => {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      window.scrollTo(0, documentHeight);
      
      setTimeout(() => {
        animateScrollToTop();
      }, 100);
    };

    const animateScrollToTop = () => {
      const startPosition = window.pageYOffset;
      const targetPosition = 0;
      const distance = startPosition - targetPosition;
      const duration = 1200; 
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeProgress = easeInOutCubic(progress);
        const currentPosition = startPosition - (distance * easeProgress);
        
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    const timer = setTimeout(() => {
      startFromBottom();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCalculation = async () => {
      if (!qubitIdx) return;

      const cachedData = getCalculationData(qubitIdx);
      if (cachedData) {
        setCalculationData(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+`calculation/${qubitIdx}`);

        if (!response.ok) {
          throw new Error('Failed to fetch calculation data');
        }

        const html = await response.text();
        setCalculationData(html);
        
        saveCalculationData(qubitIdx, html);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalculation();
  }, [qubitIdx, getCalculationData, saveCalculationData]);

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Quantum Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-cyan-900/10"></div>
          
          {/* Quantum Grid */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-white"
          >
            <div className="relative mb-8">
              {/* Quantum Loading Animation */}
              <div className="relative w-24 h-24 mx-auto">
                <Atom className="absolute inset-0 animate-spin text-purple-400" size={64} style={{animationDuration: '3s'}} />
                <div className="absolute inset-4 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
                <Calculator className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" size={20} />
              </div>
              
              {/* Quantum Rings */}
              <div className="absolute inset-0 animate-ping">
                <div className="w-24 h-24 mx-auto rounded-full border border-purple-400/30"></div>
              </div>
            </div>
            
            <h2 className="font-orbitron text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
              Processing Quantum Analysis
            </h2>
            <p className="font-rajdhani text-lg text-gray-300">Loading calculation details for Qubit {qubitIdx}...</p>
            
            <div className="flex items-center justify-center gap-1 mt-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === 0 ? 'bg-purple-400' : i === 1 ? 'bg-cyan-400' : 'bg-pink-400'
                  }`}
                  style={{
                    animation: `pulse 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Quantum Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 via-transparent to-pink-900/10"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-red-900/30 backdrop-blur-xl rounded-2xl p-8 border border-red-500/40 max-w-md"
          >
            <div className="relative w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full animate-pulse"></div>
              <Calculator size={40} className="text-red-400 relative z-10" />
            </div>
            <h3 className="font-orbitron text-red-400 font-bold text-xl mb-4">Quantum Error</h3>
            <p className="font-rajdhani text-red-300/90 mb-6 leading-relaxed">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-rajdhani font-semibold border border-purple-500/30 hover:border-cyan-500/50"
            >
              Return to Circuit
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden mt-20">
      {/* Quantum Background */}
      <div className="fixed inset-0 -z-10">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-cyan-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/5 via-transparent to-purple-900/10"></div> */}
        
        {/* Quantum Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
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

      <div className="relative z-10 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
          >
            {/* Quantum Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
                  <Calculator className="text-purple-400" size={28} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-orbitron text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
                  Qubit {qubitIdx} Analysis
                </h1>
                <p className="font-rajdhani text-gray-400 mt-1">Detailed Mathematical Computation</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/circuit')}
              className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm text-white px-4 py-3 rounded-xl transition-all duration-300 border border-gray-700/40 hover:border-cyan-500/50 font-rajdhani font-semibold relative z-10"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Circuit</span>
              <span className="sm:hidden">Back</span>
            </motion.button>
          </motion.div>

          {/* Qubit Info Section */}
          {qubitData ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 relative overflow-hidden"
            >
              {/* Quantum Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Atom className="text-purple-400 animate-spin" size={24} style={{animationDuration: '8s'}} />
                  <h2 className="font-orbitron text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Quantum State Visualization
                  </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Bloch Sphere */}
                  <div className="lg:w-1/3 flex justify-center">
                    <div className="relative">
                      <img
                        src={`data:image/png;base64,${qubitData.bloch_img}`}
                        alt={`Qubit ${qubitData.idx} Bloch Sphere`}
                        className="max-w-full max-h-80 rounded-2xl shadow-2xl border-2 border-purple-500/30 hover:border-cyan-500/50 transition-colors duration-300"
                      />
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-rajdhani font-semibold">
                        <Atom className="w-3 h-3 inline mr-1" />
                        Q{qubitData.idx}
                      </div>
                    </div>
                  </div>

                  {/* Properties */}
                  <div className="lg:w-2/3 space-y-6 text-white">
                    <div>
                      <h3 className="font-orbitron text-xl font-bold mb-6 flex items-center gap-3">
                        <Eye className="text-cyan-400" size={20} />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                          Quantum State Properties
                        </span>
                      </h3>
                      
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 hover:border-purple-500/40 transition-colors duration-300">
                        <h4 className="font-rajdhani text-lg font-semibold mb-4 text-purple-400 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Reduced Density Matrix
                        </h4>
                        <div
                          className="overflow-auto text-sm quantum-matrix-display"
                          dangerouslySetInnerHTML={{ 
                            __html: qubitData.mat_html.replace(
                              /class='table table-sm table-bordered text-center'/, 
                              "class='w-full text-center text-sm font-mono text-gray-100 quantum-table'"
                            ) 
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/40 hover:border-cyan-500/40 transition-colors duration-300">
                        <h4 className="font-rajdhani text-sm font-semibold mb-3 text-cyan-400 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                            Purity
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            qubitData.purity_state === "pure" 
                              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}>
                            {qubitData.purity_state === "pure" ? "Pure State" : "Mixed State"}
                          </span>
                        </h4>
                        <p className=" text-xl text-white bg-cyan-500/20 px-4 py-3 rounded-xl border border-cyan-500/30">
                          {qubitData.purity}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/40 hover:border-pink-500/40 transition-colors duration-300">
                        <h4 className="font-rajdhani text-sm font-semibold mb-3 text-cyan-400 flex items-center gap-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                          Bloch Vector
                        </h4>
                        <p className="font-mono text-sm text-white bg-cyan-500/20 px-4 py-3 rounded-xl break-all border border-pink-500/30">
                          ({qubitData.bloch_vec})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Quantum Formulas */}
              <div className="absolute top-4 left-4 opacity-20">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-purple-400 text-xs"
                >
                  |ψ_{qubitData.idx}⟩
                </motion.div>
              </div>
              
              <div className="absolute bottom-4 right-4 opacity-20">
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="font-mono text-cyan-400 text-xs"
                >
                  ρ = Tr₂(|ψ⟩⟨ψ|)
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-8 border border-red-500/30 text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Atom size={32} className="text-red-400" />
              </div>
              <p className="font-rajdhani text-red-400 text-lg">Qubit data not available in quantum state.</p>
            </motion.div>
          )}

          {/* Calculation Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 relative overflow-hidden"
          >
            {/* Quantum Background Pattern */}
            <div className="absolute inset-0 opacity-3" style={{
              backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 rounded-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
                    <Calculator className="text-purple-400" size={24} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="font-orbitron text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
                    Mathematical Analysis
                  </h2>
                  <p className="font-rajdhani text-gray-400 text-sm">Detailed Quantum Computation Steps</p>
                </div>
              </div>

              {/* Quantum Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
                <Atom className="w-5 h-5 text-purple-400 animate-spin" style={{animationDuration: '10s'}} />
                <div className="w-20 h-px bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"></div>
                <Calculator className="w-5 h-5 text-cyan-400" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-500"></div>
              </div>

              <div
                className="prose prose-invert max-w-none text-gray-100 
                [&>*]:text-gray-100 
                [&_h1]:font-orbitron [&_h1]:text-transparent [&_h1]:bg-clip-text [&_h1]:bg-gradient-to-r [&_h1]:from-purple-400 [&_h1]:to-cyan-400 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-6
                [&_h2]:font-orbitron [&_h2]:text-transparent [&_h2]:bg-clip-text [&_h2]:bg-gradient-to-r [&_h2]:from-cyan-400 [&_h2]:to-pink-400 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-4
                [&_h3]:font-rajdhani [&_h3]:text-purple-400 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-3
                [&_p]:font-rajdhani [&_p]:leading-relaxed [&_p]:mb-4
                [&_code]:bg-gray-800/80 [&_code]:text-cyan-300 [&_code]:px-3 [&_code]:py-1 [&_code]:rounded-lg [&_code]:font-mono [&_code]:border [&_code]:border-purple-500/30
                [&_pre]:bg-gray-800/80 [&_pre]:border-2 [&_pre]:border-purple-500/30 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:backdrop-blur-sm
                [&_pre_code]:bg-transparent [&_pre_code]:border-none [&_pre_code]:p-0
                [&_table]:border-collapse [&_table]:w-full [&_table]:bg-gray-800/50 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-purple-500/30
                [&_th]:bg-gradient-to-r [&_th]:from-purple-500/20 [&_th]:to-cyan-500/20 [&_th]:text-purple-300 [&_th]:font-orbitron [&_th]:font-semibold [&_th]:p-3 [&_th]:border-b [&_th]:border-purple-500/30
                [&_td]:p-3 [&_td]:border-b [&_td]:border-gray-700/30 [&_td]:font-mono [&_td]:text-sm
                [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-500 [&_blockquote]:bg-cyan-500/10 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:rounded-r-lg [&_blockquote]:italic
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2
                [&_li]:font-rajdhani"
                dangerouslySetInnerHTML={{ __html: calculationData }}
              />
            </div>

            {/* Floating Calculation Formulas */}
            <div className="absolute top-8 right-8 opacity-20 hidden lg:block">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="font-mono text-purple-400 text-xs"
              >
                ∂ψ/∂t = -iĤψ
              </motion.div>
            </div>
            
            <div className="absolute bottom-8 left-8 opacity-20 hidden lg:block">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="font-mono text-cyan-400 text-xs"
              >
                ⟨ψ|Ô|ψ⟩
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
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

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }

        :global(.quantum-table) {
          border-color: rgba(168, 85, 247, 0.3) !important;
        }

        :global(.quantum-table td) {
          border-color: rgba(168, 85, 247, 0.2) !important;
          padding: 8px 12px !important;
        }

        :global(.quantum-table th) {
          background: linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2)) !important;
          border-color: rgba(168, 85, 247, 0.3) !important;
          color: rgb(168, 85, 247) !important;
        }
      `}</style>
    </div>
  );
};

export default CalculationDetail;