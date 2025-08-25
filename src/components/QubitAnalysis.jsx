import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Atom, Eye, Info } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const QubitAnalysis = () => {
  const { results } = useQuantum();
  const navigate = useNavigate();

  if (!results?.qubits?.length) {
    return (
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <Atom className="text-blue-400" size={20} />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white">Qubit Analysis</h2>
        </div>
        <div className="text-center text-gray-400 py-16">
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Atom size={40} className="opacity-50" />
          </div>
          <p className="text-base font-medium">Run analysis to view qubit states</p>
        </div>
      </div>
    );
  }

  const handleViewCalculation = (qubitIdx) => {
    navigate(`/calculation/${qubitIdx}`);
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <Atom className="text-blue-400" size={20} />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white">Qubit Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {results.qubits.map((qubit) => (
          <div key={qubit.idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300 group">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {qubit.idx}
              </span>
              Qubit {qubit.idx}
            </h3>
            
            {/* Bloch Sphere */}
            <div className="mb-6">
              <img
                src={`data:image/png;base64,${qubit.bloch_img}`}
                alt={`Qubit ${qubit.idx} Bloch Sphere`}
                className="w-full bg-white rounded-xl shadow-xl border border-gray-300 group-hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            
            {/* Properties */}
            <div className="space-y-4 mb-6">
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/20">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Info size={14} />
                  Reduced Density Matrix
                </h4>
                <div 
                  className="text-xs text-gray-100 overflow-x-auto"
                  dangerouslySetInnerHTML={{ 
                    __html: qubit.mat_html.replace(
                      /class='table table-sm table-bordered text-center'/, 
                      "class='w-full text-center text-xs'"
                    ) 
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center bg-gray-900/50 rounded-xl p-4 border border-gray-700/20">
                <span className="text-sm font-medium text-gray-300">Purity:</span>
                <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  {qubit.purity}
                </span>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/20">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Bloch Vector:</h4>
                <p className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-2 rounded-lg break-all">
                  ({qubit.bloch_vec})
                </p>
              </div>
            </div>
            
            <button
              onClick={() => handleViewCalculation(qubit.idx)}
              className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105"
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Detailed View</span>
              <span className="sm:hidden">Details</span>
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default QubitAnalysis;