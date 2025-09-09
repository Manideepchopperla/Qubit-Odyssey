import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuantumProvider } from './contexts/QuantumContext';
import Navigation from './pages/Navigation';
import Navbar from './pages/Navbar';
import QuantumBackground from './pages/QuantumBackground';
import ChatBot from './pages/ChatBot';
import ChatButton from './pages/ChatButton';
import HomePage from './pages/HomePage';
import About from './pages/About';
import CalculationDetail from './pages/CalculationDetail';
import ErrorBoundary from './pages/ErrorBoundary';
import Footer from './pages/Footer';
import Teams from './pages/Teams';
import CircuitVisualizer from './pages/CircuitVisualizer';
import NotFound from './pages/NotFound'; // Add this import

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <QuantumProvider>
      <Router>
        <div className="min-h-screen relative flex flex-col">
          <QuantumBackground />
          <Navigation />
          
          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/circuit" element={<CircuitVisualizer />} />
              <Route path="/calculation/:qubitIdx" element={<CalculationDetail />} />
              <Route path="/teams" element={<Teams />} />
              {/* Catch-all route for 404 - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
          
          {/* Chat Components */}
          {!isChatOpen && <ChatButton onClick={handleChatToggle} />}
          <ErrorBoundary>
            <ChatBot isOpen={isChatOpen} onClose={handleChatClose} />
          </ErrorBoundary>
        </div>
      </Router>
    </QuantumProvider>
  );
}

export default App;