import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  RotateCcw,
  FastForward,
  Clock,
  Zap,
  Atom
} from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const StepByStepExecution = () => {
  const { results } = useQuantum();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState(null);
  const [totalSteps, setTotalSteps] = useState(0);
  const [playSpeed, setPlaySpeed] = useState(1000); // milliseconds
  const [isLoading, setIsLoading] = useState(false);
  const [stepMetadata, setStepMetadata] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (results?.has_steps) {
      fetchStepMetadata();
      setTotalSteps(results.total_steps || 0);
      setCurrentStep(0);
      fetchStepData(0);
    }
  }, [results]);

  useEffect(() => {
    if (isPlaying && currentStep < totalSteps - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep >= totalSteps - 1) {
            setIsPlaying(false);
            return totalSteps - 1;
          }
          return nextStep;
        });
      }, playSpeed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentStep, totalSteps, playSpeed]);

  useEffect(() => {
    if (currentStep >= 0) {
      fetchStepData(currentStep);
    }
  }, [currentStep]);

  const fetchStepMetadata = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}steps`);
      const data = await response.json();
      if (data.steps) {
        setStepMetadata(data.steps);
      }
    } catch (error) {
      console.error('Error fetching step metadata:', error);
    }
  };

  const fetchStepData = async (stepNumber) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}step/${stepNumber}`);
      const data = await response.json();
      if (data.error) {
        console.error('Step data error:', data.error);
      } else {
        setStepData(data);
      }
    } catch (error) {
      console.error('Error fetching step data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    if (currentStep >= totalSteps - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaySpeed(speed);
  };

  if (!results?.has_steps) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>

        <div className="relative z-10 text-center text-gray-400 py-12">
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play size={40} className="opacity-60 text-purple-400" />
          </div>
          <p className="font-rajdhani text-lg font-medium text-gray-300">
            Run quantum analysis to enable step-by-step execution
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-2xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
              <Play className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="font-orbitron text-xl lg:text-2xl font-bold text-white">
                Step-by-Step Execution
              </h2>
              <p className="font-rajdhani text-sm text-gray-400">Watch quantum gates transform Bloch spheres</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-rajdhani text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/40">
              {totalSteps} Steps
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStepBack}
                disabled={currentStep === 0}
                className="p-3 bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-800/50 disabled:opacity-50 rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-cyan-500/50 disabled:border-gray-700/30"
              >
                <SkipBack size={20} className="text-cyan-400" />
              </motion.button>

              {!isPlaying ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                  className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 border border-green-500/30"
                >
                  <Play size={24} className="text-white ml-1" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePause}
                  className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 border border-yellow-500/30"
                >
                  <Pause size={24} className="text-white" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStop}
                className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 border border-red-500/40 hover:border-red-500/60"
              >
                <Square size={20} className="text-red-400" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStepForward}
                disabled={currentStep === totalSteps - 1}
                className="p-3 bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-800/50 disabled:opacity-50 rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-cyan-500/50 disabled:border-gray-700/30"
              >
                <SkipForward size={20} className="text-cyan-400" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 bg-gray-800/60 rounded-xl p-3 border border-gray-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-rajdhani text-sm text-gray-300">Progress</span>
                  <span className="font-mono text-sm text-purple-400">
                    {currentStep + 1} / {totalSteps}
                  </span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-lg h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Speed Controls */}
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <div className="flex gap-1">
                {[
                  { speed: 2000, label: '0.5x', icon: null },
                  { speed: 1000, label: '1x', icon: null },
                  { speed: 500, label: '2x', icon: FastForward }
                ].map(({ speed, label, icon: Icon }) => (
                  <motion.button
                    key={speed}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-3 py-2 rounded-lg text-xs font-rajdhani font-semibold transition-all duration-300 flex items-center gap-1 ${
                      playSpeed === speed 
                        ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' 
                        : 'bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:bg-gray-600/40 hover:text-gray-300'
                    }`}
                  >
                    {Icon && <Icon size={12} />}
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Step Information */}
        {stepData && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Step Header */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {stepData.step}
                        </span>
                      </div>
                      {isLoading && (
                        <div className="absolute inset-0 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-orbitron text-xl font-bold text-white">
                        {stepData.gate === 'Initial State' ? 'Initial State' : `${stepData.gate.toUpperCase()} Gate`}
                      </h3>
                      <p className="font-rajdhani text-gray-400">{stepData.description}</p>
                    </div>
                  </div>

                  {stepData.gate_info && stepData.gate_info.qubits.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Zap className="text-cyan-400" size={16} />
                      <span className="font-rajdhani text-sm text-cyan-300">
                        Qubits: {stepData.gate_info.qubits.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Circuit Visualization */}
                <div className="text-center">
                  <div className="inline-block relative">
                    <img
                      src={`data:image/png;base64,${stepData.circ_img}`}
                      alt={`Circuit at step ${stepData.step}`}
                      className="max-w-full max-h-48 bg-white rounded-xl shadow-2xl border border-purple-300/30"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-rajdhani font-semibold">
                      Step {stepData.step}
                    </div>
                  </div>
                </div>
              </div>

              {/* Qubit States */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {stepData.qubits?.map((qubit) => (
                  <motion.div
                    key={`${stepData.step}-${qubit.idx}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: qubit.idx * 0.1 }}
                    className="relative group bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
                  >
                    {/* Quantum Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-blue-500/8 to-cyan-500/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Qubit Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-sm font-bold text-white">
                              {qubit.idx}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-orbitron text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                              Qubit {qubit.idx}
                            </h4>
                            <p className="font-rajdhani text-xs text-gray-400">
                              {stepData.step === 0 ? 'Initial |0⟩' : 'Transformed'}
                            </p>
                          </div>
                        </div>

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

                      {/* Animated Bloch Sphere */}
                      <div className="mb-4 relative">
                        <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/30 group-hover:border-cyan-400/50 transition-colors duration-300">
                          <motion.img
                            key={`bloch-${stepData.step}-${qubit.idx}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            src={`data:image/png;base64,${qubit.bloch_img}`}
                            alt={`Qubit ${qubit.idx} Bloch Sphere - Step ${stepData.step}`}
                            className="w-full bg-white shadow-xl"
                          />
                          
                          {/* Pulsing effect for state changes */}
                          {stepData.step > 0 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 0.3, 0] }}
                              transition={{ duration: 1, repeat: 2 }}
                              className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-purple-400/20 to-transparent"
                            />
                          )}
                        </div>
                        
                        {/* Step indicator */}
                        <div className="absolute -top-2 -right-2 bg-black/80 backdrop-blur-sm border border-purple-400/50 px-2 py-1 rounded-md">
                          <div className="font-mono text-xs text-purple-400">S{stepData.step}</div>
                        </div>
                      </div>

                      {/* Properties */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-black/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30">
                          <span className="font-rajdhani text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Zap size={12} className="text-cyan-400" />
                            Purity:
                          </span>
                          <motion.span 
                            key={`purity-${stepData.step}-${qubit.idx}`}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-500/30 font-mono"
                          >
                            {qubit.purity}
                          </motion.span>
                        </div>

                        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30">
                          <h5 className="font-rajdhani text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                            Bloch Vector:
                          </h5>
                          <motion.p 
                            key={`vector-${stepData.step}-${qubit.idx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="font-mono text-xs text-blue-400 bg-blue-500/20 px-3 py-2 rounded-lg break-all border border-blue-500/30"
                          >
                            ({qubit.bloch_vec})
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`particle-${stepData.step}-${qubit.idx}-${i}`}
                          className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-80 ${
                            i % 3 === 0 ? 'bg-purple-400' : 
                            i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
                          }`}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${15 + i * 25}%`,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            x: [0, 5, -5, 0],
                            scale: [1, 1.2, 0.8, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Background Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full opacity-20 ${
            i % 3 === 0 ? 'bg-purple-400' : 
            i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
          }`}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
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
      `}</style>
    </motion.div>
  );
};

export default StepByStepExecution;