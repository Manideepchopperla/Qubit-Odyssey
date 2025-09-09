import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Brain, User, AlertCircle, Pause, Play, Square, Settings } from 'lucide-react';
import OpenAI from 'openai';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const ChatBot = ({ isOpen, onClose }) => {
const [messages, setMessages] = useState([
{
type: 'bot',
content:
"Hello! I'm your Quantum Computing assistant powered by Team Sherbrooke. I can help you with questions about quantum Computing and questions about this Qubit Odyssey project. What would you like to know?",
timestamp: new Date(),
},
]);
const [inputMessage, setInputMessage] = useState('');
const [isTyping, setIsTyping] = useState(false);
const [error, setError] = useState(null);
const [voices, setVoices] = useState([]);
const [selectedVoice, setSelectedVoice] = useState(null);
const [showVoiceSettings, setShowVoiceSettings] = useState(false);
const [voiceSettings, setVoiceSettings] = useState({
rate: 0.9,
pitch: 1.0,
volume: 0.8
});

const messagesEndRef = useRef(null);
const inputRef = useRef(null);

// Voice state for speech synthesis
const synth = window.speechSynthesis;
const [isSpeaking, setIsSpeaking] = useState(false);
const currentUtteranceRef = useRef(null);

const client = new OpenAI({
apiKey: import.meta.env.VITE_GROQ_API_KEY,
baseURL: 'https://api.groq.com/openai/v1',
dangerouslyAllowBrowser: true,
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
if (messages.length === 1) {
speak(messages[0].content);
}
}
}, [isOpen]);

// === Load Voices ===
useEffect(() => {
const loadVoices = () => {
const availableVoices = synth.getVoices();
setVoices(availableVoices);

if (!selectedVoice && availableVoices.length > 0) {
    // Prefer English voices
    const englishVoice = availableVoices.find(voice => 
      voice.lang.includes('en') && !voice.name.includes('Google')
    ) || availableVoices.find(voice => voice.lang.includes('en')) || availableVoices[0];
    setSelectedVoice(englishVoice);
  }
};

loadVoices();
synth.onvoiceschanged = loadVoices;
}, [selectedVoice]);

// === LATEX TO SPEECH CONVERTER ===
const latexToSpeech = (text) => {
if (!text) return text;

return text
  .replace(/\$\$[\s\S]*?\$\$/g, '') // Remove block math for speech
  .replace(/\$[^$\n]+?\$/g, '') // Remove inline math for speech
  .replace(/\\frac{([^}]+)}{([^}]+)}/g, '$1 over $2')
  .replace(/\\sqrt{([^}]*)}/g, 'square root of $1')
  .replace(/\\psi/g, 'psi')
  .replace(/\\theta/g, 'theta')
  .replace(/\\phi/g, 'phi')
  .replace(/\\alpha/g, 'alpha')
  .replace(/\\beta/g, 'beta')
  .replace(/\\gamma/g, 'gamma')
  .replace(/\\delta/g, 'delta')
  .replace(/\\lambda/g, 'lambda')
  .replace(/\\sigma_x/g, 'sigma x')
  .replace(/\\sigma_y/g, 'sigma y')
  .replace(/\\sigma_z/g, 'sigma z')
  .replace(/\|0\\rangle/g, 'ket zero')
  .replace(/\|1\\rangle/g, 'ket one')
  .replace(/\|\\psi\\rangle/g, 'ket psi')
  .replace(/\|\\phi\\rangle/g, 'ket phi')
  .replace(/\\langle([^|]*)\|/g, 'bra $1')
  .replace(/\\begin{pmatrix}([^}]*)\\end{pmatrix}/g, 'matrix $1 end matrix')
  .replace(/\\hat{([^}]*)}/g, '$1 operator')
  .replace(/\\dagger/g, 'dagger')
  .replace(/\\otimes/g, 'tensor product')
  .replace(/\\sum/g, 'sum')
  .replace(/\\prod/g, 'product')
  .replace(/\\int/g, 'integral')
  .replace(/\\partial/g, 'partial')
  .replace(/\\nabla/g, 'nabla')
  .replace(/\\infty/g, 'infinity')
  .replace(/\\pi/g, 'pi')
  .replace(/\\exp/g, 'exponential')
  .replace(/\\log/g, 'logarithm')
  .replace(/\\sin/g, 'sine')
  .replace(/\\cos/g, 'cosine')
  .replace(/\\tan/g, 'tangent')
  .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
  .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
  .replace(/\$/g, '') // Remove leftover dollar signs
  .replace(/\\+/g, '') // Remove other slashes
  .replace(/\s+/g, ' ') // Normalize whitespace
  .trim();
};

// === VOICE HANDLERS ===
const speak = (text) => {
stopVoice();
if (!text) return;
const cleanText = latexToSpeech(text);
const utterance = new SpeechSynthesisUtterance(cleanText);

if (selectedVoice) utterance.voice = selectedVoice;
utterance.rate = voiceSettings.rate;
utterance.pitch = voiceSettings.pitch;
utterance.volume = voiceSettings.volume;
utterance.onend = () => setIsSpeaking(false);
utterance.onerror = () => setIsSpeaking(false);

currentUtteranceRef.current = utterance;
synth.speak(utterance);
setIsSpeaking(true);
};

const pauseVoice = () => {
if (synth.speaking && !synth.paused) {
synth.pause();
}
};

const resumeVoice = () => {
if (synth.paused) {
synth.resume();
}
};

const stopVoice = () => {
if (synth.speaking) {
synth.cancel();
setIsSpeaking(false);
}
};

// === SYSTEM PROMPT ===
const systemPrompt = `You are a specialized quantum computing assistant for a website called "Qubit Odyssey" that analyzes quantum circuits and visualizes qubits on Bloch spheres.

STRICT GUIDELINES:

ONLY answer questions related to:

Quantum computing concepts (qubits, superposition, entanglement, etc.)
Quantum mechanics and quantum physics
Quantum gates and quantum circuits
Quantum algorithms (Shor's, Grover's, etc.)
Quantum hardware and implementations
QASM (Quantum Assembly Language)
Bloch sphere visualization
Density matrices and quantum states
The Qubit Odyssey project and its features (quantum circuit analysis, qubit visualization, QASM input)
Quantum programming and quantum software
Partial trace operations and reduced density matrices
For ANY non-quantum related questions, respond EXACTLY with: "I'm specialized in quantum computing topics only. Please ask me about quantum computing topics and about the project."

CRITICAL MATH FORMATTING RULES:

ALWAYS wrap mathematical expressions in proper LaTeX delimiters:

For inline math: use single dollar signs $mathhere$
For block/display math: use double dollar signs $$mathhere$$
Use proper LaTeX notation:

Quantum states: $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$
Matrices: H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}
Fractions: $\\frac{1}{2}$ not 1/2
Greek letters: $\\theta$, $\\phi$, $\\psi$
Operators: $\\hat{H}$, $\\sigma_x$, $\\sigma_y$, $\\sigma_z$
Complex numbers: $e^{i\\phi}$
Square roots: $\\sqrt{2}$
EXAMPLES of proper formatting:

"The qubit state is $|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|1\\rangle$"
"The Hadamard gate: H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}"
"The density matrix is $\\rho = \\frac{1}{2}(I + \\vec{r} \\cdot \\vec{\\sigma})$"
For complex equations, use block math ($$...$$)

Keep responses concise but informative (max 400 words)

Use bold for important terms

NEVER use Unicode symbols like ∣, ⟩, α, β directly - always use LaTeX equivalents

Remember: You must REFUSE to answer any questions not related to quantum computing or this project. Always use proper LaTeX formatting for ALL mathematical expressions.`;

// === RENDER MATH CONTENT ===
const renderMathContent = (content) => {
if (!content) return content;

try {
  const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
  const inlineMathRegex = /\$([^$\n]+?)\$/g;

  const mathParts = [];

  let match;
  while ((match = blockMathRegex.exec(content)) !== null) {
    mathParts.push({
      type: 'block',
      start: match.index,
      end: match.index + match[0].length,
      content: match[1].trim(),
    });
  }
  blockMathRegex.lastIndex = 0;

  while ((match = inlineMathRegex.exec(content)) !== null) {
    const isInsideBlock = mathParts.some(
      (part) => part.type === 'block' && match.index >= part.start && match.index < part.end
    );
    if (!isInsideBlock) {
      mathParts.push({
        type: 'inline',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1].trim(),
      });
    }
  }
  mathParts.sort((a, b) => a.start - b.start);

  let currentIndex = 0;
  const renderedParts = [];

  mathParts.forEach((mathPart, index) => {
    if (currentIndex < mathPart.start) {
      const textContent = content.slice(currentIndex, mathPart.start);
      renderedParts.push(
        <span
          key={`text-${index}`}
          dangerouslySetInnerHTML={{
            __html: textContent
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br />'),
          }}
        />
      );
    }
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

  if (currentIndex < content.length) {
    const remainingText = content.slice(currentIndex);
    renderedParts.push(
      <span
        key="remaining"
        dangerouslySetInnerHTML={{
          __html: remainingText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br />'),
        }}
      />
    );
  }

  return renderedParts.length > 0 ? renderedParts : content;
} catch (error) {
  console.error('Math rendering error:', error);
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n/g, '<br />'),
      }}
    />
  );
}
};

// === QUANTUM FILTER ===
const isQuantumRelated = (message) => {
const quantumKeywords = [
'quantum',
'qubit',
'superposition',
'entanglement',
'decoherence',
'quantum gate',
'quantum circuit',
'bloch sphere',
'density matrix',
'hadamard',
'cnot',
'pauli',
'quantum computing',
'quantum mechanics',
'quantum state',
'measurement',
'quantum algorithm',
'shor',
'grover',
'quantum supremacy',
'quantum advantage',
'qasm',
'bell state',
'partial trace',
'reduced density matrix',
'quantum teleportation',
'quantum cryptography',
'quantum error correction',
'quantum annealing',
'ion trap',
'superconducting',
'photonic',
'topological',
'adiabatic',
'qubit odyssey',
'project',
'website',
'circuit analysis',
'visualization',
'quantum fourier',
'quantum interference',
'coherence',
'fidelity',
'quantum simulator',
'quantum programming',
'quantum software',
'quantum bits',
'quantum information',
'quantum theory',
'quantum computer',
'unitary',
'hermitian',
'eigenvalue',
'eigenvector',
'spin',
'polarization',
'interference',
'phase',
'amplitude',
'probability',
'observable',
'commutator',
'anticommutator',
'clifford',
'stabilizer',
'surface code',
'toffoli',
'fredkin',
'rotation gate',
'phase gate',
'controlled gate'
];

const nonQuantumKeywords = [
  'weather',
  'movie',
  'food',
  'sports',
  'politics',
  'news',
  'celebrity',
  'music',
  'game',
  'fashion',
  'travel',
  'cooking',
  'recipe',
  'joke',
  'story',
  'poem',
  'song',
  'dance',
  'art',
  'literature',
  'history',
  'geography',
  'biology',
  'chemistry',
  'economics',
  'finance',
  'business',
  'marketing',
  'health',
  'medicine'
];

const lowerMessage = message.toLowerCase();

const hasNonQuantumKeywords = nonQuantumKeywords.some((keyword) => 
  lowerMessage.includes(keyword.toLowerCase())
);

if (hasNonQuantumKeywords && !quantumKeywords.some((keyword) => 
  lowerMessage.includes(keyword.toLowerCase())
)) {
    return false;
}

return quantumKeywords.some((keyword) => 
  lowerMessage.includes(keyword.toLowerCase())
);
};

// === GROQ RESPONSE ===
const getGroqResponse = async (userMessage) => {
try {
setError(null);

  if (!isQuantumRelated(userMessage)) {
    return "I'm specialized in quantum computing topics only. Please ask me about quantum computing topics and about the project.";
  }

  const completion = await client.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt }, 
      { role: 'user', content: userMessage }
    ],
     model: "openai/gpt-oss-120b",
    max_tokens: 2048,
    temperature: 0.2,
    top_p: 0.9
  });

  const response = completion.choices[0]?.message?.content || 
    "I apologize, but I couldn't generate a response. Please try again.";

  if (
    !isQuantumRelated(userMessage) ||
    response.toLowerCase().includes('i cannot help') ||
    response.toLowerCase().includes('outside my expertise')
  ) {
    return "I'm specialized in quantum computing topics only. Please ask me about quantum computing topics and about the project.";
  }

  return response;
} catch (error) {
  console.error('Groq API Error:', error);

  if (error.message?.includes('API_KEY') || error.message?.includes('401')) {
    setError('API key configuration error. Please check your Groq API key.');
    return "I'm having trouble with my configuration. Please contact support.";
  } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
    setError('API rate limit exceeded. Please try again in a moment.');
    return "I'm experiencing high demand right now. Please try again in a few moments.";
  } else if (error.message?.includes('model') || error.message?.includes('not found')) {
    setError('AI model is currently unavailable. Please try again later.');
    return "I'm having trouble accessing the AI model. Please try your question again.";
  } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            setError('Network connection error. Please check your internet connection.');
    return "I'm having trouble connecting. Please check your internet connection and try again.";
  } else {
    setError("Sorry, I'm having trouble connecting to my AI brain. Please try again in a moment.");
    return "I apologize, but I'm experiencing technical difficulties. Please try asking your quantum computing question again.";
  }
}
};

// === SEND MESSAGE ===
const handleSendMessage = async () => {
if (!inputMessage.trim()) return;

const userMessage = { type: 'user', content: inputMessage, timestamp: new Date() };
setMessages((prev) => [...prev, userMessage]);
const currentMessage = inputMessage;
setInputMessage('');
setIsTyping(true);

try {
  const aiResponse = await getGroqResponse(currentMessage);
  const botResponse = { type: 'bot', content: aiResponse, timestamp: new Date() };
  setMessages((prev) => [...prev, botResponse]);
  speak(aiResponse); // Speak the AI response
} catch (error) {
  const errorResponse = {
    type: 'bot',
    content: "I apologize, but I'm experiencing technical difficulties. Please try asking your quantum computing question again.",
    timestamp: new Date(),
    isError: true,
  };
  setMessages((prev) => [...prev, errorResponse]);
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
<div className="pointer-events-auto bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 w-96 h-[650px] flex flex-col animate-in slide-in-from-right duration-300">
{/* Header */}
<div className="flex items-center justify-between p-4 border-b border-gray-700/50">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center relative">
<Brain size={18} className="text-white" />
<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
</div>
<div>
<h3 className="font-bold text-white">Quantum AI Assistant</h3>
<p className="text-xs text-gray-400">Math Rendering & Voice Enabled</p>
</div>
</div>
<div className="flex items-center gap-2">
{/* Voice Controls */}
<button
onClick={() => setShowVoiceSettings(!showVoiceSettings)}
className="p-1 hover:bg-gray-800/60 rounded-lg transition-colors text-gray-400 hover:text-white"
title="Voice Settings"
aria-label="Voice Settings"
>
<Settings size={16} />
</button>
<button onClick={pauseVoice} className="p-1 hover:bg-gray-800/60 rounded-lg transition-colors text-gray-400 hover:text-white" title="Pause Voice" aria-label="Pause Voice" >
<Pause size={16} />
</button>
<button onClick={resumeVoice} className="p-1 hover:bg-gray-800/60 rounded-lg transition-colors text-gray-400 hover:text-white" title="Resume Voice" aria-label="Resume Voice" >
<Play size={16} />
</button>
<button onClick={stopVoice} className="p-1 hover:bg-gray-800/60 rounded-lg transition-colors text-gray-400 hover:text-white" title="Stop Voice" aria-label="Stop Voice" >
<Square size={16} />
</button>
<button
onClick={() => {
stopVoice();
onClose();
}}
className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors text-gray-400 hover:text-white"
title="Close Chatbot"
aria-label="Close Chatbot"
>
<X size={20} />
</button>
</div>
</div>

    {/* Voice Settings Panel */}
    {showVoiceSettings && (
      <div className="p-4 bg-gray-800/60 border-b border-gray-700/50 space-y-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Voice:</label>
          <select
            className="bg-gray-700 text-white p-2 rounded text-sm border border-gray-600 focus:border-cyan-500 focus:outline-none"
            value={voices.indexOf(selectedVoice)}
            onChange={(e) => setSelectedVoice(voices[e.target.value])}
          >
            {voices.map((voice, i) => (
              <option key={i} value={i}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Rate</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceSettings.rate}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500 text-center">{voiceSettings.rate}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Pitch</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceSettings.pitch}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500 text-center">{voiceSettings.pitch}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={voiceSettings.volume}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500 text-center">{voiceSettings.volume}</span>
          </div>
        </div>
        
        <button
          onClick={() => speak("This is a test of the quantum computing voice assistant.")}
          className="w-full p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors"
        >
          Test Voice Settings
        </button>
      </div>
    )}

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
        <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'user'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                : message.isError
                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
            aria-label={message.type === 'user' ? 'User message icon' : 'Bot message icon'}
          >
            {message.type === 'user' ? <User size={16} /> : <Brain size={16} />}
          </div>
          <div className={`max-w-[calc(100%-3rem)] ${message.type === 'user' ? 'text-right' : ''}`}>
            <div
              className={`rounded-2xl px-4 py-3 overflow-hidden ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white'
                  : message.isError
                  ? 'bg-red-900/20 border border-red-500/30 text-red-100'
                  : 'bg-gray-800/60 text-gray-100 border border-gray-700/30'
              }`}
            >
              <div className="text-sm leading-relaxed break-words">
                {message.type === 'user' ? (
                  <span className="whitespace-pre-wrap" aria-label="User message">
                    {message.content}
                  </span>
                ) : (
                  <div className="space-y-2" aria-label="Bot message">
                    {renderMathContent(message.content)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500" aria-label="Message timestamp">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              {message.type === 'bot' && !message.isError && (
                <button
                  onClick={() => speak(message.content)}
                  className="text-xs text-gray-400 hover:text-cyan-400 transition-colors ml-2 px-2 py-1 hover:bg-gray-700/50 rounded"
                  title="Speak this message"
                  aria-label="Speak this message"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-3" aria-live="polite" aria-busy="true">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <Brain size={16} />
          </div>
          <div className="bg-gray-800/60 border border-gray-700/30 rounded-2xl px-4 py-2">
            <div className="flex gap-1 items-center">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
            'What is quantum superposition?',
            'How do quantum gates work?',
            'Explain the Bloch sphere',
            'What is quantum entanglement?',
            'Tell me about this Qubit Odyssey project',
            'What is a density matrix?',
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-2 bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-cyan-500/30 rounded-lg transition-all duration-200 text-xs text-gray-300 hover:text-white"
              aria-label={`Quick question: ${question}`}
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
          aria-label="Input message for chatbot"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-600 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
          aria-label="Send message"
          title="Send message"
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
      {isSpeaking && (
        <div className="flex items-center gap-2 mt-2 text-xs text-cyan-400">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
          <span>Speaking...</span>
        </div>
      )}
    </div>
  </div>
</div>
);
};

export default ChatBot;