import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuantumProvider } from './contexts/QuantumContext';
import Navbar from './pages/Navbar';
import QuantumBackground from './components/QuantumBackground';
import ChatBot from './components/ChatBot';
import ChatButton from './components/ChatButton';
import HomePage from './pages/HomePage';
import About from './components/About';
import CalculationDetail from './components/CalculationDetail';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './pages/Footer';

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
          <Navbar />
          
          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/calculation/:qubitIdx" element={<CalculationDetail />} />
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