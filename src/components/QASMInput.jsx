import React from 'react';
import { Upload, Play, FileText, RotateCcw } from 'lucide-react';
import { useQuantum } from '../contexts/QuantumContext';

const QASMInput = () => {
  const { 
    setResults, 
    setIsLoading, 
    setError, 
    qasmCode, 
    setQasmCode,
    clearPersistedData 
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
      setError('Please enter QASM code');
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
    if (window.confirm('Are you sure you want to clear all data? This will reset the QASM code, circuit, and all calculations.')) {
      clearPersistedData();
    }
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/40">
            <FileText className="text-cyan-400" size={20} />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white">.QASM Input</h2>
        </div>


        <button
          onClick={handleReset}
          className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-300"
          title="Clear all data"
        >
          <RotateCcw className="text-red-400" size={16} />
        </button>
        
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <textarea
          value={qasmCode}
          onChange={(e) => setQasmCode(e.target.value)}
          className="flex-1 bg-gray-800/95 text-gray-100 border border-gray-700/60 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500/60 transition-all duration-300 placeholder-gray-500"
          placeholder="Enter your QASM code here..."
        />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex-1 bg-gray-800/70 hover:bg-gray-700/70 text-gray-200 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium border border-gray-700/40 hover:border-emerald-500/40">
            <Upload size={16} />
            <span className="hidden sm:inline">Upload QASM File</span>
            <span className="sm:hidden">Upload</span>
            <input
              type="file"
              accept=".qasm,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
          >
            <Play size={16} />
            <span className="hidden sm:inline">Run Analysis</span>
            <span className="sm:hidden">Run</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QASMInput;