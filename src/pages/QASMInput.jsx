import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, FileText, RotateCcw, Atom, Zap } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const QASMInput = () => {
  const { 
    setResults, 
    setIsLoading, 
    setError, 
    qasmCode, 
    setQasmCode,
    clearPersistedData,
    isLoading 
  } = useQuantum();

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setQasmCode(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!qasmCode.trim()) {
      setError('Please enter .QASM code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('qasm_code', qasmCode);

      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'process', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Failed to connect to backend. Please ensure Flask server is running on localhost:5000');
    } finally {
      setIsLoading(false);
    }
  };

  

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all quantum data? This will reset the QASM code, circuit, and all calculations.')) {
      clearPersistedData();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
            className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/20 h-full flex flex-col overflow-hidden"
    >
      {/* Hero-matching Quantum Background Effects */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)`,
        backgroundSize: '25px 25px'
      }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-2xl"></div>

      {/* Floating Quantum Particles with Hero Colors */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full opacity-30 ${
            i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-blue-400'
          }`}
          style={{
            left: `${15 + i * 25}%`,
            top: `${10 + i * 20}%`,
            animation: `quantumFloat ${4 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
                <FileText className="text-purple-400" size={20} />
              </div>
              {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div> */}
            </div>
            <div>
              <h2 className="font-orbitron text-xl lg:text-1xl font-bold text-white">
                .QASM Input
              </h2>
              <p className="font-rajdhani text-xs text-gray-400">OpenQASM 2.0 Circuit Definition</p>
            </div>
          </div>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/40 hover:border-red-500/60 transition-all duration-300 backdrop-blur-sm group"
            title="Clear all quantum data"
          >
            <RotateCcw className="text-red-400 group-hover:text-red-300 transition-colors" size={16} />
          </motion.button>
        </div>

        {/* QASM Code Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative flex-1">
            <textarea
              value={qasmCode}
              onChange={(e) => setQasmCode(e.target.value)}
              className="w-full h-full bg-black/60 backdrop-blur-sm text-gray-100 border border-gray-700/50 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all duration-300 placeholder-gray-500 hover:border-purple-500/40"
              placeholder={`// Enter your QASM code here...
                            // Example:
                            OPENQASM 2.0;
                            include "qelib1.inc";
                            qreg q[2];
                            creg c[2];
                            h q[0];
                            cx q[0],q[1];
                            measure q -> c;`
                          }
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Upload Button */}
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-gray-200 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 font-rajdhani text-sm font-medium border border-gray-700/50 hover:border-cyan-500/50 group"
            >
              <Upload size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="hidden sm:inline">Upload QASM File</span>
              <span className="sm:hidden">Upload</span>
              {/* <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse ml-1"></div> */}
              <input
                type="file"
                accept=".qasm,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.label>
            
            {/* Run Analysis Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 flex justify-center items-center gap-2 whitespace-nowrap 
                        bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 
                        hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                        text-white text-sm font-semibold px-4 py-3 rounded-xl 
                        transition-all duration-300 shadow-lg hover:shadow-purple-500/30 
                        border border-purple-500/30 hover:border-cyan-500/50"
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <Atom className="animate-spin" size={16} />
                  <span className="hidden sm:inline">Processing...</span>
                  <span className="sm:hidden">Processing</span>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <Play size={16} />
                  <span className="hidden sm:inline">Run Quantum Analysis</span>
                  <span className="sm:hidden">Analyze</span>
                  <Zap className="w-3 h-3 animate-pulse ml-1" />
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-15px) translateX(10px) scale(1.2) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(5px) translateX(-12px) scale(0.8) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-8px) translateX(8px) scale(1.1) rotate(270deg);
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
      `}</style>
    </motion.div>
  );
};

export default QASMInput;