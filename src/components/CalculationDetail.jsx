import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Loader, Atom } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="relative mb-6">
            <Loader className="animate-spin mx-auto" size={48} />
            <div className="absolute inset-0 animate-pulse">
              <Loader size={48} className="opacity-30 mx-auto" />
            </div>
          </div>
          <p className="text-lg font-medium">Loading calculation details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-red-900/20 rounded-2xl p-8 border border-red-500/30 max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator size={32} className="text-red-400" />
          </div>
          <p className="text-red-400 font-medium mb-4 text-lg">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
              <Calculator className="text-blue-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Qubit {qubitIdx}
              </h1>
              <p className="text-gray-400 mt-1">Detailed Calculation Analysis</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700/60 text-white px-4 py-3 rounded-xl transition-all duration-300 border border-gray-700/30 hover:border-emerald-500/30"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Analysis</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        {/* Qubit Info Section */}
        {qubitData ? (
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Bloch Sphere */}
              <div className="lg:w-1/3 flex justify-center">
                <img
                  src={`data:image/png;base64,${qubitData.bloch_img}`}
                  alt={`Qubit ${qubitData.idx} Bloch Sphere`}
                  className="max-w-full max-h-80 rounded-xl shadow-2xl border border-gray-300"
                />
              </div>

              {/* Properties */}
              <div className="lg:w-2/3 space-y-6 text-white">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Atom className="text-emerald-400" size={20} />
                    Quantum State Properties
                  </h3>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <h4 className="text-lg font-semibold mb-4 text-emerald-400">Density Matrix</h4>
                    <div
                      className="overflow-auto text-sm"
                      dangerouslySetInnerHTML={{ 
                        __html: qubitData.mat_html.replace(
                          /class='table table-sm table-bordered text-center'/, 
                          "class='w-full text-center text-sm font-mono text-gray-100'"
                        ) 
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-sm font-semibold mb-2 text-cyan-400">Purity</h4>
                    <p className="text-xl font-mono text-white bg-cyan-500/10 px-3 py-2 rounded-lg">
                      {qubitData.purity}
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-sm font-semibold mb-2 text-blue-400">Bloch Vector</h4>
                    <p className="text-sm font-mono text-white bg-blue-500/10 px-3 py-2 rounded-lg break-all">
                      ({qubitData.bloch_vec})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 text-center">
            <p className="text-red-400 text-lg">Qubit data not available.</p>
          </div>
        )}

        {/* Calculation Content */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="text-purple-400" size={24} />
            Detailed Mathematical Analysis
          </h2>
          <div
            className="prose prose-invert max-w-none text-gray-100 [&>*]:text-gray-100 [&_h1]:text-cyan-400 [&_h2]:text-emerald-400 [&_h3]:text-blue-400 [&_code]:bg-gray-800 [&_code]:text-cyan-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-gray-800 [&_pre]:border [&_pre]:border-gray-700 [&_pre]:rounded-lg"
            dangerouslySetInnerHTML={{ __html: calculationData }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculationDetail;