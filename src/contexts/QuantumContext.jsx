import React, { createContext, useContext, useState, useEffect } from 'react';

const QuantumContext = createContext(undefined);

export const useQuantum = () => {
  const context = useContext(QuantumContext);
  if (context === undefined) {
    throw new Error('useQuantum must be used within a QuantumProvider');
  }
  return context;
};

export const QuantumProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qasmCode, setQasmCode] = useState('OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[3];\ncreg c[2];\nh q[0];\ncx q[0],q[1];\nrx(0.5) q[2];');

  const STORAGE_KEYS = {
    RESULTS: 'quantum_analysis_results',
    QASM_CODE: 'quantum_qasm_code',
    CALCULATION_DATA: 'quantum_calculation_data'
  };

  useEffect(() => {
    try {
      const savedResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
      if (savedResults) {
        const parsedResults = JSON.parse(savedResults);
        setResults(parsedResults);
      }

      const savedQasmCode = localStorage.getItem(STORAGE_KEYS.QASM_CODE);
      if (savedQasmCode) {
        setQasmCode(savedQasmCode);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      localStorage.removeItem(STORAGE_KEYS.RESULTS);
      localStorage.removeItem(STORAGE_KEYS.QASM_CODE);
      localStorage.removeItem(STORAGE_KEYS.CALCULATION_DATA);
    }
  }, []);

  const setResultsWithPersistence = (newResults) => {
    setResults(newResults);
    if (newResults) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(newResults));
    } else {
      localStorage.removeItem(STORAGE_KEYS.RESULTS);
    }
  };

  const setQasmCodeWithPersistence = (newQasmCode) => {
    setQasmCode(newQasmCode);
    localStorage.setItem(STORAGE_KEYS.QASM_CODE, newQasmCode);
  };

  const saveCalculationData = (qubitIdx, calculationHtml) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATION_DATA) || '{}');
      existingData[qubitIdx] = calculationHtml;
      localStorage.setItem(STORAGE_KEYS.CALCULATION_DATA, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving calculation data:', error);
    }
  };

  const getCalculationData = (qubitIdx) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATION_DATA) || '{}');
      return existingData[qubitIdx] || null;
    } catch (error) {
      console.error('Error getting calculation data:', error);
      return null;
    }
  };

  const clearPersistedData = () => {
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.QASM_CODE);
    localStorage.removeItem(STORAGE_KEYS.CALCULATION_DATA);
    setResults(null);
    setQasmCode('OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[3];\ncreg c[2];\nh q[0];\ncx q[0],q[1];\nrx(0.5) q[2];');
    setError(null);
  };

  return (
    <QuantumContext.Provider
      value={{
        results,
        setResults: setResultsWithPersistence,
        isLoading,
        setIsLoading,
        error,
        setError,
        qasmCode,
        setQasmCode: setQasmCodeWithPersistence,
        saveCalculationData,
        getCalculationData,
        clearPersistedData,
      }}
    >
      {children}
    </QuantumContext.Provider>
  );
};