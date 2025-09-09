import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronRight, Atom, Calculator, Eye, Lightbulb, Zap } from 'lucide-react';

const About = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(prev => prev === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden mt-20">
      {/* Quantum Background Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Quantum Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Floating Quantum Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
              i % 4 === 0 ? 'bg-purple-400' : 
              i % 4 === 1 ? 'bg-cyan-400' : 
              i % 4 === 2 ? 'bg-pink-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `quantumFloat ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 lg:mb-16"
          >
            {/* Quantum Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/40 backdrop-blur-sm">
              <Atom className="w-4 h-4 text-purple-400 animate-spin" style={{animationDuration: '8s'}} />
              <span className="font-rajdhani text-sm text-purple-300 font-semibold tracking-wide">
                Quantum Theory Guide
              </span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              <span className="block">Quantum State</span>
              <span className="block mt-2">Analysis Guide</span>
            </h1>
            
            <p className="font-rajdhani text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto px-2 leading-relaxed">
              Understanding <span className="text-cyan-400 font-semibold">Single-Qubit Reduced Density Matrices</span> and partial tracing from multi-qubit quantum systems
            </p>

            {/* Quantum Divider */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
              
              <div className="w-20 h-px bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"></div>
              <Eye className="w-5 h-5 text-cyan-400" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <ConceptCard
              title="Core Quantum Concepts"
              icon={Lightbulb}
              expanded={expandedSection === 'concepts'}
              onToggle={() => toggleSection('concepts')}
              delay={0.2}
            >
              <div className="space-y-6">
                <ConceptItem
                  title="Quantum Circuit and Multi-Qubit States"
                  description="A quantum circuit is a sequence of operations (quantum gates) applied to qubits. When you have multiple qubits, their combined state can be described by a complex vector (if pure) or a matrix called a density matrix (if mixed). The density matrix for the entire system contains information about all qubits combined."
                  icon={Calculator}
                />
                
                <ConceptItem
                  title="Density Matrix"
                  description="A density matrix is a way to describe a quantum state, either pure or mixed. For pure states, it represents the state vector; for mixed states, it accounts for probabilistic mixtures of quantum states. It is a square matrix that captures probabilities and phase information of a quantum system."
                  icon={Calculator}
                />
                
                <ConceptItem
                  title="Reduced Density Matrix & Partial Trace"
                  description="When you want information about just one qubit in a multi-qubit system, you use a mathematical technique called partial trace. Partial trace 'traces out' (ignores) the other qubits to isolate the state of the single qubit. This gives you the reduced density matrix for that one qubit, which summarizes its state, including entanglement and mixedness, without involving the others."
                  icon={Zap}
                />
                
                <ConceptItem
                  title="Single-Qubit Mixed State"
                  description="The reduced density matrix for one qubit can describe a mixed state rather than a pure quantum state. A mixed state means the qubit is not in a perfectly known state; it's like a probabilistic blend of states due to entanglement or noise."
                  icon={Atom}
                />
                
                <ConceptItem
                  title="Bloch Sphere Visualization"
                  description="The Bloch sphere is a 3D sphere representation of a single qubit state. Every pure qubit state corresponds to a point on the surface of the sphere. Mixed states correspond to points inside the sphere (closer to the center for more mixed states). Visualizing the reduced density matrix on the Bloch sphere helps us intuitively see the 'state' of each qubit in the multi-qubit system."
                  icon={Eye}
                />
              </div>
            </ConceptCard>

            <ConceptCard
              title="Step-by-Step Analysis: Bell State Example"
              icon={Calculator}
              expanded={expandedSection === 'example'}
              onToggle={() => toggleSection('example')}
              delay={0.4}
            >
              <div className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30 hover:border-cyan-500/40 transition-colors duration-300 relative overflow-hidden">
                  {/* Quantum Background Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Atom className="w-5 h-5 text-cyan-400 animate-spin" style={{animationDuration: '6s'}} />
                      Two-Qubit Entangled Bell State
                    </h3>
                    <p className="font-rajdhani text-gray-300 mb-4">Consider the famous Bell state (maximally entangled two-qubit state):</p>
                    <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30 overflow-x-auto">
                      |ψ⟩ = (1/√2)(|00⟩ + |11⟩)
                    </div>
                  </div>
                </div>

                <StepCard
                  stepNumber="1"
                  title="Construct the Full Density Matrix"
                  content={
                    <div className="space-y-4">
                      <p className="font-rajdhani text-gray-300">Since |ψ⟩ is a pure state, its density matrix ρ is:</p>
                      <div className="overflow-x-auto">
                        <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                          ρ = |ψ⟩⟨ψ| = (1/2)(|00⟩ + |11⟩)(⟨00| + ⟨11|)
                        </div>
                      </div>
                      <p className="font-rajdhani text-gray-300">Expanding this:</p>
                      <div className="overflow-x-auto">
                        <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                          ρ = (1/2)(|00⟩⟨00| + |00⟩⟨11| + |11⟩⟨00| + |11⟩⟨11|)
                        </div>
                      </div>
                      <p className="font-rajdhani text-gray-300">In matrix form (using the basis |00⟩, |01⟩, |10⟩, |11⟩):</p>
                      <div className="overflow-x-auto">
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
                    </div>
                  }
                />

                <StepCard
                  stepNumber="2"
                  title="Apply Partial Trace for Qubit Reduction"
                  content={
                    <div className="space-y-4">
                      <p className="font-rajdhani text-gray-300">We want the reduced density matrix for <span className="text-cyan-400 font-semibold">qubit 1</span> (first qubit). The partial trace removes qubit 2.</p>
                      <p className="font-rajdhani text-gray-300">Definition:</p>
                      <div className="overflow-x-auto">
                        <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                          ρ₁ = Tr₂(ρ) = Σⱼ(I ⊗ ⟨j|) ρ (I ⊗ |j⟩)
                        </div>
                      </div>
                      <p className="font-rajdhani text-gray-300">where |j⟩ runs over the basis for qubit 2: |0⟩, |1⟩.</p>
                      <p className="font-rajdhani text-gray-300">Calculate the 2×2 reduced matrix for qubit 1:</p>
                      <div className="overflow-x-auto">
                        <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                          (ρ₁)ₘ,ₙ = Σₖ₌₀¹ ρ₍ₘ,ₖ₎,₍ₙ,ₖ₎
                        </div>
                      </div>
                      <div className="text-gray-300 space-y-2 font-rajdhani">
                        <p>• (ρ₁)₀,₀ = ρ₍₀,₀₎,₍₀,₀₎ + ρ₍₀,₁₎,₍₀,₁₎ = ρ₀,₀ + ρ₁,₁ = ½ + 0 = ½</p>
                        <p>• (ρ₁)₀,₁ = ρ₍₀,₀₎,₍₁,₀₎ + ρ₍₀,₁₎,₍₁,₁₎ = ρ₀,₂ + ρ₁,₃ = 0 + 0 = 0</p>
                        <p>• (ρ₁)₁,₀ = ρ₍₁,₀₎,₍₀,₀₎ + ρ₍₁,₁₎,₍₀,₁₎ = ρ₂,₀ + ρ₃,₁ = 0 + 0 = 0</p>
                        <p>• (ρ₁)₁,₁ = ρ₍₁,₀₎,₍₁,₀₎ + ρ₍₁,₁₎,₍₁,₁₎ = ρ₂,₂ + ρ₃,₃ = 0 + ½ = ½</p>
                      </div>
                      <p className="font-rajdhani text-gray-300">So,</p>
                      <div className="overflow-x-auto">
                        <Matrix 
                          variable="ρ₁"
                          rows={[
                            ['1/2', '0'],
                            ['0', '1/2']
                          ]}
                        />
                      </div>
                    </div>
                  }
                />

                <StepCard
                  stepNumber="3"
                  title="Interpret the Reduced Density Matrix"
                  content={
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <Matrix 
                          variable="ρ₁" 
                          coefficient="1/2"
                          rows={[
                            ['1', '0'],
                            ['0', '1']
                          ]}
                        />
                      </div>
                      <div className="bg-cyan-500/20 rounded-xl p-4 border border-cyan-500/40">
                        <p className="font-rajdhani text-gray-200">
                          This is the <span className="text-cyan-400 font-semibold">maximally mixed state</span> for a single qubit—completely random, with no preferred orientation between |0⟩ or |1⟩ states.
                        </p>
                      </div>
                    </div>
                  }
                />

                <StepCard
                  stepNumber="4"
                  title="Bloch Sphere Visualization"
                  content={
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/40 text-center">
                          <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                          <p className="font-rajdhani text-green-300 text-sm font-semibold">Pure States</p>
                          <p className="font-rajdhani text-gray-400 text-xs">Surface of sphere</p>
                        </div>
                        <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/40 text-center">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                          <p className="font-rajdhani text-yellow-300 text-sm font-semibold">Mixed States</p>
                          <p className="font-rajdhani text-gray-400 text-xs">Inside sphere</p>
                        </div>
                        {/* <div className="bg-pink-500/20 rounded-xl p-4 border border-pink-500/40 text-center">
                          <div className="w-3 h-3 bg-pink-400 rounded-full mx-auto mb-2"></div>
                          <p className="font-rajdhani text-pink-300 text-sm font-semibold">Maximally Mixed</p>
                          <p className="font-rajdhani text-gray-400 text-xs">Center of sphere</p>
                        </div> */}
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/40">
                        <p className="font-rajdhani text-gray-300">
                          Qubit 1 appears completely mixed (random) due to quantum entanglement with qubit 2, placing it at the center of the Bloch sphere.
                        </p>
                      </div>
                    </div>
                  }
                />
              </div>
            </ConceptCard>

            <ConceptCard
              title="Bloch Sphere Plotting Method"
              icon={Eye}
              expanded={expandedSection === 'plotting'}
              onToggle={() => toggleSection('plotting')}
              delay={0.6}
            >
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30 hover:border-cyan-500/40 transition-colors duration-300 relative overflow-hidden">
                  {/* Quantum Background Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '25px 25px'
                  }}></div>
                  
                  <div className="relative z-10">
                    <p className="font-rajdhani text-gray-300 mb-4">
                      To plot a single-qubit state on the Bloch sphere, we extract the qubit's coordinates from the reduced density matrix. Here's the quantum mechanical process:
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-orbitron text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                      1. Extract Bloch Vector from Density Matrix
                    </h4>
                    <p className="font-rajdhani text-gray-300 mb-4">
                      A single-qubit density matrix ρ can be expressed in terms of the Bloch vector <span className="font-mono text-cyan-300"> r̄ = (x, y, z)</span>:
                    </p>
                    <div className="overflow-x-auto">
                      <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center mb-4 border border-purple-500/30">
                        ρ = (1/2)(I + xσₓ + yσᵧ + zσ<sub>z</sub>)
                      </div>
                    </div>
                    <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/40">
                      <div className="text-gray-300 space-y-2 font-rajdhani">
                        <p className="font-semibold text-purple-300 mb-3">Where:</p>
                        <p>• <span className="font-mono text-cyan-300">I</span> = 2 × 2 identity matrix</p>
                        <p>• <span className="font-mono text-cyan-300">σₓ, σᵧ, σ<sub>z</sub></span> = Pauli matrices</p>
                      </div>
                    </div>
                    <p className="font-rajdhani text-gray-300 mt-4">The components of the Bloch vector are calculated as:</p>
                    <div className="overflow-x-auto">
                      <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center space-y-2 border border-purple-500/30">
                        <div>x = Tr(ρσₓ)</div>
                        <div>y = Tr(ρσᵧ)</div>
                        <div>z = Tr(ρσ<sub>z</sub>)</div>
                      </div>
                    </div>
                    <p className="font-rajdhani text-gray-300 mt-4">These traces give real numbers between −1 and 1.</p>
                  </div>

                  <div>
                    <h4 className="font-orbitron text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-purple-400" />
                      2. Manual Calculation Example
                    </h4>
                    <p className="font-rajdhani text-gray-300 mb-4">
                      Let's manually calculate the Bloch vector components <span className="font-mono text-cyan-300">x, y, z</span> for the reduced density matrix from our Bell state example:
                    </p>
                    <div className="overflow-x-auto">
                      <Matrix 
                        variable="ρ₁" 
                        coefficient="1/2"
                        rows={[
                          ['1', '0'],
                          ['0', '1']
                        ]}
                      />
                    </div>

                    <div className="mt-6">
                      <h5 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Atom className="w-4 h-4 text-cyan-400 animate-spin" style={{animationDuration: '4s'}} />
                        Step 1: Recall the Pauli Matrices
                      </h5>
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
                          variable="σ𝓏"
                          rows={[
                            ['1', '0'],
                            ['0', '-1']
                          ]}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-pink-400" />
                        Step 2: Calculate Bloch Vector Components
                      </h5>
                      <p className="font-rajdhani text-gray-300 mb-4">Using the formula <span className="font-mono text-cyan-300">x = Tr(ρσₓ)</span>, etc.</p>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/40 hover:border-purple-500/40 transition-colors duration-300">
                          <h6 className="font-rajdhani font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                            Compute x = Tr(ρ₁σₓ):
                          </h6>
                          <div className="space-y-4">
                            <div className="overflow-x-auto">
                              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
                                  <span>ρ₁σₓ =</span>
                                  <div className="flex flex-wrap items-center justify-center gap-2">
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
                              </div>
                            </div>
                            <p className="font-rajdhani text-gray-300">Trace is sum of diagonal elements:</p>
                            <div className="overflow-x-auto">
                              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                                x = Tr(ρ₁σₓ) = (1/2)(0 + 0) = 0
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/40 hover:border-cyan-500/40 transition-colors duration-300">
                          <h6 className="font-rajdhani font-semibold text-purple-400 mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                            Compute y = Tr(ρ₁σᵧ):
                          </h6>
                          <div className="space-y-4">
                            <div className="overflow-x-auto">
                              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                                ρ₁σᵧ = (1/2)I · σᵧ = (1/2)σᵧ
                              </div>
                            </div>
                            <p className="font-rajdhani text-gray-300">Trace diagonal elements of σᵧ are zero:</p>
                            <div className="overflow-x-auto">
                              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                                y = Tr(ρ₁σᵧ) = (1/2)(0 + 0) = 0
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/40 hover:border-pink-500/40 transition-colors duration-300">
                          <h6 className="font-rajdhani font-semibold text-pink-400 mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                            Compute z = Tr(ρ₁σ<sub>z</sub>):
                          </h6>
                          <div className="space-y-4">
                            <div className="overflow-x-auto">
                              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                                ρ₁σ<sub>z</sub> = (1/2)I · σ<sub>z</sub> = (1/2)σ<sub>z</sub>
                              </div>
                            </div>
                            <p className="font-rajdhani text-gray-300">Trace diagonal elements:</p>
                            <div className="overflow-x-auto">
                              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center border border-purple-500/30">
                                z = Tr(ρ₁σ<sub>z</sub>) = (1/2)(1 + (-1)) = (1/2) × 0 = 0
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                        Final Bloch Vector Result:
                      </h5>
                      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl p-4 sm:p-6 border border-purple-500/40">
                        <div className="overflow-x-auto">
                          <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-cyan-300 text-center mb-4 border border-purple-500/30">
                             r̄ = (x, y, z) = (0, 0, 0)
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
                          <p className="font-rajdhani text-gray-200 text-center">
                            This corresponds to the <span className="text-cyan-400 font-semibold">center</span> of the Bloch sphere, confirming the qubit is in a maximally mixed quantum state.
                          </p>
                          <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-orbitron text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Eye className="w-5 h-5 text-pink-400 animate-pulse" />
                      3. Bloch Vector Interpretation
                    </h4>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 rounded-2xl"></div>
                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
                            <span className="font-rajdhani text-white font-semibold">Pure states:</span>
                            <span className="font-rajdhani text-gray-400">| r̄ | = 1 (sphere surface)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                            <span className="font-rajdhani text-white font-semibold">Mixed states:</span>
                            <span className="font-rajdhani text-gray-400">| r̄ | &lt; 1 (inside sphere)</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                            <span className="font-rajdhani text-white font-semibold">Maximally mixed:</span>
                            <span className="font-rajdhani text-gray-400"> r̄ = (0,0,0) (center)</span>
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ConceptCard>
          </div>

          {/* Floating Quantum Formulas */}
          <div className="absolute top-20 left-8 opacity-20 hidden lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono text-purple-400 text-xs"
            >
              ρ = |ψ⟩⟨ψ|
            </motion.div>
          </div>
          
          <div className="absolute bottom-32 right-12 opacity-20 hidden lg:block">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="font-mono text-cyan-400 text-xs"
            >
              Tr(ρ) = 1
            </motion.div>
          </div>
          
          <div className="absolute top-1/2 left-16 opacity-20 hidden xl:block">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="font-mono text-pink-400 text-xs"
            >
              | r̄ | ≤ 1
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-25px) translateX(15px) scale(1.3) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(10px) translateX(-20px) scale(0.7) rotate(180deg);
            opacity: 0.4;
          }
          75%{
            transform: translateY(-15px) translateX(10px) scale(1.1) rotate(270deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

// --- Helper Components (Matrix, ConceptCard, ConceptItem, StepCard) ---

const Matrix = ({ variable, coefficient = null, rows, className = "" }) => {
  const maxCols = Math.max(...rows.map(row => row.length));
  return (
    <div className={`bg-gray-900/60 backdrop-blur-sm rounded-xl p-2 sm:p-4 lg:p-6 border border-purple-500/30 hover:border-cyan-500/40 transition-colors duration-300 ${className}`}>
      <div className="flex items-center justify-center overflow-x-auto">
        <div className="font-mono text-cyan-300 text-xs sm:text-sm lg:text-base flex items-center gap-3 min-w-fit">
          {variable && <span className="font-orbitron text-base sm:text-lg whitespace-nowrap text-white">{variable} =</span>}
          {coefficient && (
            <span className="text-base sm:text-lg whitespace-nowrap text-purple-300">({coefficient})</span>
          )}
          <div className="relative">
            {/* Left bracket */}
            <div className="absolute left-0 top-0 h-full w-1 flex flex-col">
              <div className="h-1 w-4 border-t-2 border-l-2 border-purple-400"></div>
              <div className="flex-1 w-1 border-l-2 border-purple-400"></div>
              <div className="h-1 w-4 border-b-2 border-l-2 border-purple-400"></div>
            </div>
            <div className="px-6 py-2">
              <div className="space-y-1">
                {rows.map((row, i) => (
                  <div key={i} className="flex gap-4">
                    {Array.from({ length: maxCols }, (_, j) => (
                      <span key={j} className="w-8 text-center text-xs sm:text-sm lg:text-base text-cyan-300 font-mono">
                        {row[j] || ''}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Right bracket */}
            <div className="absolute right-0 top-0 h-full w-1 flex flex-col">
              <div className="h-1 w-4 border-t-2 border-r-2 border-purple-400 ml-[-12px]"></div>
              <div className="flex-1 w-1 border-r-2 border-purple-400"></div>
              <div className="h-1 w-4 border-b-2 border-r-2 border-purple-400 ml-[-12px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConceptCard = ({ title, icon: Icon, children, expanded, onToggle, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
  >
    {/* Quantum Background Pattern */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}></div>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 rounded-2xl"></div>

    <button
      onClick={onToggle}
      className="relative z-10 w-full flex items-center justify-between p-4 sm:p-6 lg:p-8 hover:bg-gray-800/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-2xl"
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm">
            <Icon className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
        </div>
        <h2 className="font-orbitron text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white text-left leading-tight min-w-0 break-words">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {expanded ? (
            <ChevronDown className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <ChevronRight className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </motion.div>
      </div>
    </button>
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
    {/* Floating Quantum Particles */}
    {expanded && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
              i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-pink-400'
            }`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${15 + i * 25}%`,
              animation: `quantumFloat ${4 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    )}
  </motion.div>
);

const ConceptItem = ({ title, description, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/40 hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden"
  >
    {/* Quantum Background Pattern */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{
      backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
      backgroundSize: '20px 20px'
    }}></div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />}
        <h4 className="font-orbitron text-lg font-semibold text-white group-hover:text-white transition-all duration-300">{title}</h4>
      </div>
      <p className="font-rajdhani text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
        {description}
      </p>
    </div>
    {/* Hover Effect Particles */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            i === 0 ? 'bg-purple-400' : 'bg-cyan-400'
          }`}
          style={{
            left: `${20 + i * 60}%`,
            top: `${20 + i * 40}%`,
            animation: `quantumFloat ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  </motion.div>
);

const StepCard = ({ stepNumber, title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/40 overflow-hidden hover:border-purple-500/40 transition-colors duration-300 group"
  >
    <div className="bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-pink-600/20 p-4 border-b border-gray-700/30 group-hover:border-purple-500/30 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-orbitron font-bold text-sm shadow-lg group-hover:shadow-purple-500/50 transition-shadow duration-300">
            {stepNumber}
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
        </div>
        <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-white transition-all duration-300">{title}</h3>
      </div>
    </div>
    <div className="p-4 sm:p-6 relative">
      {/* Quantum Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{
        backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
        backgroundSize: '25px 25px'
      }}></div>
      <div className="relative z-10">
        {content}
      </div>
    </div>
  </motion.div>
);

export default About;