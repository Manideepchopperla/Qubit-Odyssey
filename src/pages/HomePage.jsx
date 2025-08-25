import React from 'react';
import QASMInput from '../components/QASMInput';
import CircuitDisplay from '../components/CircuitDisplay';
import QubitAnalysis from '../components/QubitAnalysis';

const HomePage = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text text-white mb-4">
            Visualizing Single-Qubit Mixed States from Multi-Qubit Circuits
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Bridge between complex quantum circuits and intuitive Bloch sphere insights.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* QASM Input */}
          <div className="h-96 lg:h-[28rem]">
            <QASMInput />
          </div>

          {/* Circuit Display */}
          <div className="h-96 lg:h-[28rem]">
            <CircuitDisplay />
          </div>
        </div>

        {/* Full Width Qubit Analysis */}
        <QubitAnalysis />
      </div>
    </div>
  );
};

export default HomePage;