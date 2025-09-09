import { motion } from "framer-motion";

// Helper for the floating particle
const ParticleFormula = ({ formula, full, color }) => (
  <div
    className={`
      bg-black/60 backdrop-blur-sm border 
      px-2 sm:px-3 py-1 sm:py-1.5 rounded-md 
      font-mono text-xs sm:text-sm whitespace-nowrap
      ${color === 'purple' ? 'border-purple-400/60 text-purple-400' : 'border-cyan-400/60 text-cyan-400'}
    `}
  >
    {full ? (
      <>
        <span className="hidden sm:inline">{full}</span>
        <span className="sm:hidden">{formula}</span>
      </>
    ) : formula}
  </div>
);

export default function SquareParticles() {
  return (
    <div className="relative w-[90%] h-[90%]">
      {/* Top-left: moves up/down */}
      <motion.div
        className="absolute left-2 sm:left-4 top-2 sm:top-4 z-10"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ParticleFormula
        formula="|ψ₁⟩"
        full="|ψ₁⟩ = α₁|0⟩ + β₁|1⟩"
        color="purple" />
      </motion.div>

      {/* Top-right: moves left/right */}
      <motion.div
        className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ParticleFormula
          formula="|ψ₂⟩"
          full="|ψ₂⟩ = α₂|0⟩ + β₂|1⟩"
          color="cyan"
        />
      </motion.div>

      {/* Bottom-left: moves left/right */}
      <motion.div
        className="absolute left-2 sm:left-4 bottom-2 sm:bottom-4 z-10"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ParticleFormula
          formula="|0⟩" color="cyan"
        />
      </motion.div>

      {/* Bottom-right: moves up/down */}
      <motion.div
        className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 z-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ParticleFormula formula="|1⟩" color="purple" />
      </motion.div>
    </div>
  );
}