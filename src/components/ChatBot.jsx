// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Zap, AlertCircle, Brain } from 'lucide-react';
import OpenAI from 'openai';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm your Quantum Computing assistant powered by Groq AI. I can help you with questions about quantum mechanics, quantum circuits, qubits, quantum gates, and questions about this Qubit Odyssey project. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize OpenAI client with Groq endpoint
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Enhanced system prompt with better LaTeX formatting guidelines
  const systemPrompt = `You are a specialized quantum computing assistant for a website called "Qubit Odyssey" that analyzes quantum circuits and visualizes qubits on Bloch spheres.

STRICT GUIDELINES:

ONLY answer questions related to:
- Quantum computing concepts (qubits, superposition, entanglement, etc.)
- Quantum mechanics and quantum physics
- Quantum gates and quantum circuits
- Quantum algorithms (Shor's, Grover's, etc.)
- Quantum hardware and implementations
- QASM (Quantum Assembly Language)
- Bloch sphere visualization
- Density matrices and quantum states
- The Qubit Odyssey project and its features (quantum circuit analysis, qubit visualization, QASM input)
- Quantum programming and quantum software
- Partial trace operations and reduced density matrices

For ANY non-quantum related questions, respond EXACTLY with: "I'm specialized in quantum computing topics only. Please ask me about quantum computing topics and about the project."

CRITICAL MATH FORMATTING RULES:

1. ALWAYS wrap mathematical expressions in proper LaTeX delimiters:
   - For inline math: use single dollar signs $math here$
   - For block/display math: use double dollar signs $$math here$$

2. Use proper LaTeX notation:
   - Quantum states: $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$
   - Matrices: $H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$
   - Fractions: $\\frac{1}{2}$ not 1/2
   - Greek letters: $\\theta$, $\\phi$, $\\psi$
   - Operators: $\\hat{H}$, $\\sigma_x$, $\\sigma_y$, $\\sigma_z$
   - Complex numbers: $e^{i\\phi}$
   - Square roots: $\\sqrt{2}$

3. EXAMPLES of proper formatting:
   - "The qubit state is $|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|1\\rangle$"
   - "The Hadamard gate: $$H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$"
   - "The density matrix is $\\rho = \\frac{1}{2}(I + \\vec{r} \\cdot \\vec{\\sigma})$"

4. For complex equations, use block math ($$...$$)

5. Keep responses concise but informative (max 400 words)

6. Use **bold** for important terms

7. NEVER use Unicode symbols like ∣, ⟩, α, β directly - always use LaTeX equivalents

Remember: You must REFUSE to answer any questions not related to quantum computing or this project. Always use proper LaTeX formatting for ALL mathematical expressions.`;

  // Simplified and more robust math rendering function
  const renderMathContent = (content) => {
    if (!content) return content;

    try {
      const parts = [];
      let lastIndex = 0;
      
      // Handle block math first ($$...$$)
      const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
      const inlineMathRegex = /\$([^$\n]+?)\$/g;
      
      let match;
      const mathParts = [];
      
      // Find all math expressions
      while ((match = blockMathRegex.exec(content)) !== null) {
        mathParts.push({
          type: 'block',
          start: match.index,
          end: match.index + match[0].length,
          content: match[1].trim()
        });
      }
      
      // Reset regex
      blockMathRegex.lastIndex = 0;
      
      while ((match = inlineMathRegex.exec(content)) !== null) {
        // Check if this inline math is inside a block math
        const isInsideBlock = mathParts.some(part => 
          part.type === 'block' && match.index >= part.start && match.index < part.end
        );
        
        if (!isInsideBlock) {
          mathParts.push({
            type: 'inline',
            start: match.index,
            end: match.index + match[0].length,
            content: match[1].trim()
          });
        }
      }
      
      // Sort by start position
      mathParts.sort((a, b) => a.start - b.start);
      
      // Build the rendered content
      let currentIndex = 0;
      const renderedParts = [];
      
      mathParts.forEach((mathPart, index) => {
        // Add text before this math part
        if (currentIndex < mathPart.start) {
          const textContent = content.slice(currentIndex, mathPart.start);
          renderedParts.push(
            <span 
              key={`text-${index}`}
              dangerouslySetInnerHTML={{
                __html: textContent
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/\n/g, '<br />')
              }}
            />
          );
        }
        
        // Add the math part
        if (mathPart.type === 'block') {
          renderedParts.push(
            <div key={`block-${index}`} className="my-3 overflow-x-auto">
              <BlockMath math={mathPart.content} />
            </div>
          );
        } else {
          renderedParts.push(
            <span key={`inline-${index}`} className="mx-1">
              <InlineMath math={mathPart.content} />
            </span>
          );
        }
        
        currentIndex = mathPart.end;
      });
      
      // Add remaining text
      if (currentIndex < content.length) {
        const remainingText = content.slice(currentIndex);
        renderedParts.push(
          <span 
            key="remaining"
            dangerouslySetInnerHTML={{
              __html: remainingText
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br />')
            }}
          />
        );
      }
      
      return renderedParts.length > 0 ? renderedParts : content;
      
    } catch (error) {
      console.error('Math rendering error:', error);
      // Fallback to basic rendering
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br />')
          }}
        />
      );
    }
  };

  const isQuantumRelated = (message) => {
    const quantumKeywords = [
      'quantum', 'qubit', 'superposition', 'entanglement', 'decoherence',
      'quantum gate', 'quantum circuit', 'bloch sphere', 'density matrix',
      'hadamard', 'cnot', 'pauli', 'quantum computing', 'quantum mechanics',
      'quantum state', 'measurement', 'quantum algorithm', 'shor', 'grover',
      'quantum supremacy', 'quantum advantage', 'qasm', 'bell state',
      'partial trace', 'reduced density matrix', 'quantum teleportation',
      'quantum cryptography', 'quantum error correction', 'quantum annealing',
      'ion trap', 'superconducting', 'photonic', 'topological', 'adiabatic',
      'qubit odyssey', 'project', 'website', 'circuit analysis', 'visualization',
      'quantum fourier', 'quantum interference', 'coherence', 'fidelity',
      'quantum simulator', 'quantum programming', 'quantum software',
      'quantum bits', 'quantum information', 'quantum theory', 'quantum computer'
    ];

    const nonQuantumKeywords = [
      'weather', 'movie', 'food', 'sports', 'politics', 'news', 'celebrity',
      'music', 'game', 'fashion', 'travel', 'cooking', 'recipe', 'joke',
      'story', 'poem', 'song', 'dance', 'art', 'literature'
    ];

    const lowerMessage = message.toLowerCase();

    const hasNonQuantumKeywords = nonQuantumKeywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );

    if (hasNonQuantumKeywords && !quantumKeywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
      return false;
    }

    return quantumKeywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  };

  const getGroqResponse = async (userMessage) => {
    try {
      setError(null);

      if (!isQuantumRelated(userMessage)) {
        return "I'm specialized in quantum computing topics only. Please ask me about quantum computing topics and about the project.";
      }

      const completion = await client.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        model: "openai/gpt-oss-120b",
        max_tokens: 2048,
        temperature: 0.2,
        top_p: 0.9
      });

      const response = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

      if (!isQuantumRelated(userMessage) || response.toLowerCase().includes('i cannot help') || response.toLowerCase().includes('outside my expertise')) {
        return "I'm specialized in quantum computing topics only. Please ask me about quantum computing topics and about the project.";
      }

      return response;
    } catch (error) {
      console.error('Groq API Error:', error);
      
      if (error.message?.includes('API_KEY') || error.message?.includes('401')) {
        setError('API key configuration error. Please check your Groq API key.');
        return 'I\'m having trouble with my configuration. Please contact support.';
      } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        setError('API rate limit exceeded. Please try again in a moment.');
        return 'I\'m experiencing high demand right now. Please try again in a few moments.';
      } else if (error.message?.includes('model') || error.message?.includes('not found')) {
        setError('AI model is currently unavailable. Please try again later.');
        return 'I\'m having trouble accessing the AI model. Please try your question again.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setError('Network connection error. Please check your internet connection.');
        return 'I\'m having trouble connecting. Please check your internet connection and try again.';
      } else {
        setError('Sorry, I\'m having trouble connecting to my AI brain. Please try again in a moment.');
                return 'I apologize, but I\'m experiencing technical difficulties. Please try asking your quantum computing question again.';
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await getGroqResponse(currentMessage);
      
      const botResponse = {
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        type: 'bot',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try asking your quantum computing question again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div className="pointer-events-auto bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 w-96 h-[600px] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center relative">
              <Brain size={18} className="text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h3 className="font-bold text-white">Quantum AI Assistant</h3>
              <p className="text-xs text-gray-400">Math Rendering Enabled</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-3 m-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' 
                  : message.isError
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }`}>
                {message.type === 'user' ? <User size={16} /> : <Brain size={16} />}
              </div>
              <div className={`max-w-[calc(100%-3rem)] ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 overflow-hidden ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white'
                    : message.isError
                      ? 'bg-red-900/20 border border-red-500/30 text-red-100'
                      : 'bg-gray-800/60 text-gray-100 border border-gray-700/30'
                }`}>
                  <div className="text-sm leading-relaxed break-words">
                    {message.type === 'user' ? (
                      <span className="whitespace-pre-wrap">{message.content}</span>
                    ) : (
                      <div className="space-y-2">
                        {renderMathContent(message.content)}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <Brain size={16} />
              </div>
              <div className="bg-gray-800/60 border border-gray-700/30 rounded-2xl px-4 py-2">
                <div className="flex gap-1 items-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">AI thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && !isTyping && (
          <div className="p-4 pt-0">
            <p className="text-xs text-gray-400 mb-3">Try asking:</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                "What is quantum superposition?",
                "How do quantum gates work?",
                "Explain the Bloch sphere",
                "What is quantum entanglement?",
                "Tell me about this Qubit Odyssey project",
                "What is a density matrix?"
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-2 bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-cyan-500/30 rounded-lg transition-all duration-200 text-xs text-gray-300 hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about quantum computing..."
              className="flex-1 bg-gray-800/60 border border-gray-700/30 rounded-xl px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500/60 text-sm"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-600 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;