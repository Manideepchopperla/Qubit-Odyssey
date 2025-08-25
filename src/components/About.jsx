// src/pages/About.jsx
import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Atom, Calculator, Eye, Lightbulb } from 'lucide-react';

const About = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 mb-4">
            Brief Explanation
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Understanding Single-Qubit Reduced Density Matrices and  partial tracing 
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Core Concepts */}
          <ConceptCard
            title="Core Concepts"
            icon={Lightbulb}
            expanded={expandedSections.concepts}
            onToggle={() => toggleSection('concepts')}
          >
            <div className="space-y-6">
              <ConceptItem
                title="Quantum Circuit and Multi-Qubit States"
                description="A quantum circuit is a sequence of operations (quantum gates) applied to qubits. When you have multiple qubits, their combined state can be described by a complex vector (if pure) or a matrix called a density matrix (if mixed). The density matrix for the entire system contains information about all qubits combined."
              />
              
              <ConceptItem
                title="Density Matrix"
                description="A density matrix is a way to describe a quantum state, either pure or mixed. For pure states, it represents the state vector; for mixed states, it accounts for probabilistic mixtures of quantum states. It is a square matrix that captures probabilities and phase information of a quantum system."
              />
              
              <ConceptItem
                title="Reduced Density Matrix & Partial Trace"
                description="When you want information about just one qubit in a multi-qubit system, you use a mathematical technique called partial trace. Partial trace 'traces out' (ignores) the other qubits to isolate the state of the single qubit. This gives you the reduced density matrix for that one qubit, which summarizes its state, including entanglement and mixedness, without involving the others."
              />
              
              <ConceptItem
                title="Single-Qubit Mixed State"
                description="The reduced density matrix for one qubit can describe a mixed state rather than a pure quantum state. A mixed state means the qubit is not in a perfectly known state; it's like a probabilistic blend of states due to entanglement or noise."
              />
              
              <ConceptItem
                title="Bloch Sphere Visualization"
                description="The Bloch sphere is a 3D sphere representation of a single qubit state. Every pure qubit state corresponds to a point on the surface of the sphere. Mixed states correspond to points inside the sphere (closer to the center for more mixed states). Visualizing the reduced density matrix on the Bloch sphere helps us intuitively see the 'state' of each qubit in the multi-qubit system."
              />
            </div>
          </ConceptCard>

          {/* Step-by-Step Example */}
          <ConceptCard
            title="Step-by-Step with Example: Bell State Analysis"
            icon={Calculator}
            expanded={expandedSections.example}
            onToggle={() => toggleSection('example')}
          >
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Example: Two-Qubit System with an Entangled State (Bell State)</h3>
                <p className="text-gray-300 mb-4">Take the famous Bell state (maximally entangled two-qubit state):</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                  |ψ⟩ = (1/√2)(|00⟩ + |11⟩)
                </div>
              </div>

              <StepCard
                stepNumber="1"
                title="Write the Full Density Matrix of the Two-Qubit State"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-300">Since |ψ⟩ is a pure state, its density matrix ρ is:</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                      ρ = |ψ⟩⟨ψ| = (1/2)(|00⟩ + |11⟩)(⟨00| + ⟨11|)
                    </div>
                    <p className="text-gray-300">Expanding this:</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                      ρ = (1/2)(|00⟩⟨00| + |00⟩⟨11| + |11⟩⟨00| + |11⟩⟨11|)
                    </div>
                    <p className="text-gray-300">In matrix form (using the basis |00⟩, |01⟩, |10⟩, |11⟩):</p>
                    
                    <Matrix 
                      variable="ρ" 
                      coefficient="1/2"
                      rows={[
                        ['1', '0', '0', '1'],
                        ['0', '0', '0', '0'],
                        ['0', '0', '0', '0'],
                        ['1', '0', '0', '1']
                      ]}
                    />
                  </div>
                }
              />

              <StepCard
                stepNumber="2"
                title="Partial Trace Over One Qubit to Get Reduced Density Matrix"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-300">We want the reduced density matrix for <span className="text-emerald-400">qubit 1</span> (first qubit). The partial trace removes qubit 2.</p>
                    <p className="text-gray-300">Definition:</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                      ρ₁ = Tr₂(ρ) = Σⱼ(I ⊗ ⟨j|) ρ (I ⊗ |j⟩)
                    </div>
                    <p className="text-gray-300">where |j⟩ runs over the basis for qubit 2: |0⟩, |1⟩.</p>
                    <p className="text-gray-300">Calculate the 2×2 reduced matrix for qubit 1:</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-sm">
                      (ρ₁)ₘ,ₙ = Σₖ₌₀¹ ρ₍ₘ,ₖ₎,₍ₙ,ₖ₎
                    </div>
                    <div className="text-gray-300 space-y-2">
                      <p>• (ρ₁)₀,₀ = ρ₍₀,₀₎,₍₀,₀₎ + ρ₍₀,₁₎,₍₀,₁₎ = ρ₀,₀ + ρ₁,₁ = ½ + 0 = ½</p>
                      <p>• (ρ₁)₀,₁ = ρ₍₀,₀₎,₍₁,₀₎ + ρ₍₀,₁₎,₍₁,₁₎ = ρ₀,₂ + ρ₁,₃ = 0 + 0 = 0</p>
                      <p>• (ρ₁)₁,₀ = ρ₍₁,₀₎,₍₀,₀₎ + ρ₍₁,₁₎,₍₀,₁₎ = ρ₂,₀ + ρ₃,₁ = 0 + 0 = 0</p>
                      <p>• (ρ₁)₁,₁ = ρ₍₁,₀₎,₍₁,₀₎ + ρ₍₁,₁₎,₍₁,₁₎ = ρ₂,₂ + ρ₃,₃ = 0 + ½ = ½</p>
                    </div>
                    <p className="text-gray-300">So,</p>
                    
                    <Matrix 
                      variable="ρ₁"
                      rows={[
                        ['1/2', '0'],
                        ['0', '1/2']
                      ]}
                    />
                  </div>
                }
              />

              <StepCard
                stepNumber="3"
                title="Interpret the Reduced Density Matrix"
                content={
                  <div className="space-y-4">
                    <Matrix 
                      variable="ρ₁" 
                      coefficient="1/2"
                      rows={[
                        ['1', '0'],
                        ['0', '1']
                      ]}
                    />
                    <p className="text-gray-300">
                      This is the <span className="text-emerald-400">maximally mixed state</span> for a single qubit—completely random, no information about being in |0⟩ or |1⟩.
                    </p>
                  </div>
                }
              />

              <StepCard
                stepNumber="4"
                title="Visualization on the Bloch Sphere"
                content={
                  <div className="space-y-4">
                    <div className="text-gray-300 space-y-2">
                      <p>• Pure states lie on the <span className="text-cyan-400">surface</span> of the Bloch sphere.</p>
                      <p>• Mixed states lie <span className="text-emerald-400">inside</span> the Bloch sphere.</p>
                      <p>• The maximally mixed state ρ = (1/2)I corresponds to the <span className="text-blue-400">center</span> of the Bloch sphere.</p>
                    </div>
                    <p className="text-gray-300">
                      So, qubit 1 alone appears completely mixed (random) due to entanglement with qubit 2.
                    </p>
                  </div>
                }
              />
            </div>
          </ConceptCard>

          {/* Bloch Sphere Plotting */}
          <ConceptCard
            title="How to Plot a Qubit State on the Bloch Sphere"
            icon={Eye}
            expanded={expandedSections.plotting}
            onToggle={() => toggleSection('plotting')}
          >
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <p className="text-gray-300 mb-4">
                  To plot a single-qubit state on the Bloch sphere, we use the reduced density matrix to extract the qubit's state coordinates in 3D space. Here's how it works:
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">1. Extract Bloch Vector from the Density Matrix</h4>
                  <p className="text-gray-300 mb-4">
                    A single-qubit density matrix ρ can be expressed in terms of the Bloch vector <span className="font-mono text-cyan-300">r⃗ = (x, y, z)</span>:
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center mb-4">
                    ρ = (1/2)(I + xσₓ + yσᵧ + zσᵤ)
                  </div>
                  <div className="text-gray-300 space-y-2">
                    <p>Where:</p>
                    <p>• <span className="font-mono text-cyan-300">I</span> = 2 × 2 identity matrix</p>
                    <p>• <span className="font-mono text-cyan-300">σₓ, σᵧ, σᵤ</span> = Pauli matrices</p>
                  </div>
                  <p className="text-gray-300 mt-4">The components of the Bloch vector are calculated as:</p>
                  <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center space-y-2">
                    <div>x = Tr(ρσₓ)</div>
                    <div>y = Tr(ρσᵧ)</div>
                    <div>z = Tr(ρσᵤ)</div>
                  </div>
                  <p className="text-gray-300 mt-4">These traces give real numbers between −1 and 1.</p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">2. Manual Calculation Example</h4>
                  <p className="text-gray-300 mb-4">
                    Let's manually calculate the Bloch vector components <span className="font-mono text-cyan-300">x, y, z</span> for the reduced density matrix of our previous example — the maximally mixed single-qubit state:
                  </p>
                  
                  <Matrix 
                    variable="ρ₁" 
                    coefficient="1/2"
                    rows={[
                      ['1', '0'],
                      ['0', '1']
                    ]}
                  />

                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-blue-400 mb-4">Step 1: Recall the Pauli Matrices</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Matrix 
                        variable="σₓ"
                        rows={[
                          ['0', '1'],
                          ['1', '0']
                        ]}
                      />
                      <Matrix 
                        variable="σᵧ"
                        rows={[
                          ['0', '-i'],
                          ['i', '0']
                        ]}
                      />
                                            <Matrix 
                        variable="σᵤ"
                        rows={[
                          ['1', '0'],
                          ['0', '-1']
                        ]}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-blue-400 mb-4">Step 2: Calculate each component of Bloch vector</h5>
                    <p className="text-gray-300 mb-4">Using the formula <span className="font-mono text-cyan-300">x = Tr(ρσₓ)</span>, etc.</p>
                    
                    <div className="space-y-6">
                      {/* Compute x */}
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                        <h6 className="text-md font-semibold text-cyan-400 mb-3">• Compute x = Tr(ρ₁σₓ):</h6>
                        <div className="space-y-4">
                          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                            <div className="flex items-center justify-center gap-4 mb-2">
                              <span>ρ₁σₓ =</span>
                              <Matrix 
                                variable=""
                                coefficient="1/2"
                                rows={[
                                  ['1', '0'],
                                  ['0', '1']
                                ]}
                                className="inline-block"
                              />
                              <Matrix 
                                variable=""
                                rows={[
                                  ['0', '1'],
                                  ['1', '0']
                                ]}
                                className="inline-block"
                              />
                              <span>=</span>
                              <Matrix 
                                variable=""
                                coefficient="1/2"
                                rows={[
                                  ['0', '1'],
                                  ['1', '0']
                                ]}
                                className="inline-block"
                              />
                              <span>= (1/2)σₓ</span>
                            </div>
                          </div>
                          <p className="text-gray-300">Trace is sum of diagonal elements:</p>
                          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                            x = Tr(ρ₁σₓ) = (1/2)(0 + 0) = 0
                          </div>
                        </div>
                      </div>

                      {/* Compute y */}
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                        <h6 className="text-md font-semibold text-cyan-400 mb-3">• Compute y = Tr(ρ₁σᵧ):</h6>
                        <div className="space-y-4">
                          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                            ρ₁σᵧ = (1/2)I · σᵧ = (1/2)σᵧ
                          </div>
                          <p className="text-gray-300">Trace diagonal elements of σᵧ are zero:</p>
                          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                            y = Tr(ρ₁σᵧ) = (1/2)(0 + 0) = 0
                          </div>
                        </div>
                      </div>

                      {/* Compute z */}
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                        <h6 className="text-md font-semibold text-cyan-400 mb-3">• Compute z = Tr(ρ₁σᵤ):</h6>
                        <div className="space-y-4">
                          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                            ρ₁σᵤ = (1/2)I · σᵤ = (1/2)σᵤ
                          </div>
                          <p className="text-gray-300">Trace diagonal elements:</p>
                          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center">
                            z = Tr(ρ₁σᵤ) = (1/2)(1 + (-1)) = (1/2) × 0 = 0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-purple-400 mb-4">Final Bloch Vector:</h5>
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                      <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-cyan-300 text-center mb-4">
                        r⃗ = (x, y, z) = (0, 0, 0)
                      </div>
                      <p className="text-gray-300">
                        This corresponds to the <span className="text-blue-400">center</span> of the Bloch sphere, confirming the qubit is in a maximally mixed state.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">3. Interpretation of the Bloch Vector</h4>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <div className="text-gray-300 space-y-3">
                      <p>• <span className="text-cyan-400">Pure states</span>: |r⃗| = 1 (on the surface of the sphere)</p>
                      <p>• <span className="text-emerald-400">Mixed states</span>: |r⃗| &lt; 1 (inside the sphere)</p>
                      <p>• <span className="text-blue-400">Maximally mixed state</span>: r⃗ = (0, 0, 0) (center of the sphere)</p>
                      <p>• The closer to the center, the more mixed the state</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </div>
      </div>
    </div>
  );
};

// Matrix component for proper mathematical formatting
const Matrix = ({ variable, coefficient = null, rows, className = "" }) => {
  const maxCols = Math.max(...rows.map(row => row.length));
  
  return (
    <div className={`bg-gray-900/50 rounded-lg p-6 border border-gray-700/30 ${className}`}>
      <div className="flex items-center justify-center">
        <div className="font-mono text-cyan-300 text-lg flex items-center gap-4">
          {variable && <span className="text-xl">{variable} =</span>}
          {coefficient && (
            <span className="text-xl">({coefficient})</span>
          )}
          <div className="relative">
            {/* Left bracket */}
            <div className="absolute left-0 top-0 h-full w-1 flex flex-col">
              <div className="h-1 w-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="flex-1 w-1 border-l-2 border-cyan-400"></div>
              <div className="h-1 w-4 border-b-2 border-l-2 border-cyan-400"></div>
            </div>
            
            {/* Matrix content */}
            <div className="px-6 py-2">
              <div className="space-y-1">
                {rows.map((row, i) => (
                  <div key={i} className="flex gap-4">
                    {Array.from({ length: maxCols }, (_, j) => (
                      <span key={j} className="w-8 text-center">
                        {row[j] || ''}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right bracket */}
            <div className="absolute right-0 top-0 h-full w-1 flex flex-col">
              <div className="h-1 w-4 border-t-2 border-r-2 border-cyan-400 ml-[-12px]"></div>
              <div className="flex-1 w-1 border-r-2 border-cyan-400"></div>
              <div className="h-1 w-4 border-b-2 border-r-2 border-cyan-400 ml-[-12px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const ConceptCard = ({ title, icon: Icon, children, expanded, onToggle }) => {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 lg:p-8 hover:bg-gray-800/30 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/40">
            <Icon className="text-cyan-400" size={24} />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white text-left">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronDown className="text-cyan-400" size={24} />
          ) : (
            <ChevronRight className="text-cyan-400" size={24} />
          )}
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${
        expanded 
          ? 'max-h-[5000px] opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}>
        <div className="px-6 pb-6 lg:px-8 lg:pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

const ConceptItem = ({ title, description }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
      <h4 className="text-lg font-semibold text-emerald-400 mb-3">{title}</h4>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

const StepCard = ({ stepNumber, title, content }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 p-4 border-b border-gray-700/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {stepNumber}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        {content}
      </div>
    </div>
  );
};

export default About;