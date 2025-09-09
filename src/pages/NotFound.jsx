import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          {/* Quantum-themed 404 */}
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            404
          </h1>
          <div className="text-2xl font-semibold text-white mb-2">
            Quantum State Not Found
          </div>
          <p className="text-gray-300 mb-8">
            The quantum superposition has collapsed, and this page exists in a null state.
          </p>
        </div>
        
        {/* Navigation options */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Return to Home
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/about"
              className="flex-1 py-2 px-4 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              About
            </Link>
            <Link
              to="/circuit"
              className="flex-1 py-2 px-4 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              Circuit
            </Link>
          </div>
        </div>
        
        {/* Quantum animation effect */}
        <div className="mt-12">
          <div className="inline-block animate-pulse">
            <span className="text-4xl">🌌</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;