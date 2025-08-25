import React from 'react';
import { BrainCircuit as Circuit, Loader } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const CircuitDisplay = () => {
  const { results, isLoading, error } = useQuantum();

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            <Circuit className="text-emerald-400" size={20} />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
            Quantum Circuit
          </h2>
        </div>

        <a
          href="https://quantum.cloud.ibm.com/composer?initial=N4IgjghgzgtiBcIDyAFAogOQIoEEDKAsgAQBMAdAAwDcAOgHYCWdAxgDYCuAJgKZE3jdWDAEYBGMk2b9ademABO3AOZEwAbQAsAXRnNFK5pp30QAGhB0IMbghABVOgBcGj1t05FmDec3YuQAL5AA"
          target="_blank"
          rel="noreferrer"
          aria-label="Open IBM Quantum Composer in new tab"
          title="Open IBM Quantum Composer"
          className="inline-flex items-center gap-2 whitespace-nowrap bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white"
        >
          Composer
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 text-cyan-400">
            <div className="relative">
              <Loader className="animate-spin" size={40} />
              <div className="absolute inset-0 animate-pulse">
                <Loader size={40} className="opacity-30" />
              </div>
            </div>
            <p className="text-sm font-medium">Processing quantum circuit...</p>
          </div>
        ) : error ? (
          <div className="text-center bg-red-900/20 rounded-xl p-6 border border-red-500/30 max-w-sm">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Circuit size={24} className="text-red-400" />
            </div>
            <p className="text-red-400 font-medium mb-2">Error</p>
            <p className="text-xs text-red-300/80">{error}</p>
          </div>
        ) : results?.circ_img ? (
          <div className="text-center w-full">
            <img
              src={`data:image/png;base64,${results.circ_img}`}
              alt="Quantum Circuit"
              className="max-w-full max-h-64 mx-auto bg-white rounded-xl shadow-2xl border border-gray-300"
            />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Circuit size={32} className="opacity-50" />
            </div>
            <p className="text-sm font-medium">Run analysis to view circuit diagram</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircuitDisplay;
