import React, { useEffect, useState } from 'react';
import { BrainCircuit as Circuit, Loader } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const CircuitDisplay = () => {
  const { results, isLoading, error } = useQuantum();
  const [fallingQubits, setFallingQubits] = useState([]);

  useEffect(() => {
    if (results?.circ_img && results?.qubit_names?.length) {
      // Trigger all qubits falling at once
      const qubitsWithId = results.qubit_names.map((name, i) => ({
        id: `${name}-${Date.now()}-${i}`,
        text: name,
        offset: (i - results.qubit_names.length / 2) * 50, // horizontal spread
      }));
      setFallingQubits(qubitsWithId);

      // Clear after 2s
      const timer = setTimeout(() => {
        setFallingQubits([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [results?.circ_img, results?.qubit_names]);

  return (
    <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/20 h-full flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-2xl"></div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
              <Circuit className="text-purple-400" size={20} />
            </div>
            <h2 className="text-xl lg:text-1xl font-orbitron font-bold text-white whitespace-nowrap">
              Quantum Circuit
            </h2>
          </div>
            <a
            href="https://quantum.cloud.ibm.com/composer?initial=N4IgjghgzgtiBcIDyAFAogOQIoEEDKAsgAQBMAdAAwDcAOgHYCWdAxgDYCuAJgKZE3jdWDAEYBGMk2b9ademABO3AOZEwAbQAsAXRnNFK5pp30QAGhB0IMbghABVOgBcGj1t05FmDec3YuQAL5AA"
            target="_blank"
            rel="noreferrer"
            aria-label="Open IBM Quantum Composer in new tab"
            title="Open IBM Quantum Composer"
            className="inline-flex items-center gap-2 whitespace-nowrap 
                        bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 
                        hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                        text-white text-sm font-semibold px-3 py-2 rounded-xl 
                        transition-all duration-300 shadow-lg hover:shadow-purple-500/30 
                        border border-purple-500/30 hover:border-cyan-500/50"
          >
            Composer
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 text-purple-400">
              <Loader className="animate-spin" size={40} />
              <p className="text-sm font-medium">Processing quantum circuit...</p>
            </div>
          ) : error ? (
            <div className="text-center bg-red-900/20 rounded-xl p-6 border border-red-500/30 max-w-sm backdrop-blur-sm">
              <p className="text-red-400 font-medium mb-2">Error: {error}</p>
            </div>
          ) : results?.circ_img ? (
            <div className="text-center w-full relative">
              <div className="relative inline-block">
                <img
                  src={`data:image/png;base64,${results.circ_img}`}
                  alt="Quantum Circuit"
                  className="max-w-full max-h-64 mx-auto bg-white rounded-xl shadow-2xl border border-purple-300/30"
                />

                {/* Falling qubit names */}
                {fallingQubits.length > 0 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    {fallingQubits.map((q) => (
                      <span
                        key={q.id}
                        className="absolute text-xl font-bold text-cyan-400 falling-qubit"
                        style={{ left: `${q.offset}px` }}
                      >
                        {q.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-sm font-medium">Run analysis to view circuit diagram</p>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fallDown {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }
        .falling-qubit {
          animation: fallDown 2s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default CircuitDisplay;